import configService from '@/services/config.service';
import {createChooser} from "@/models/colors";
import {outsidePromise} from "@/lib/utils";
import httpService from "@/services/http.service";
import {sha256} from "js-sha256";

const DEFAULT_BBLOCKS_REGISTER = 'https://opengeospatial.github.io/bblocks/register.json';
const DEFAULT_BBLOCKS_REGISTER_MARKER = 'default';

const COPY_PROPERTIES = ['local', 'register', 'importLevel']

const registerPalette = createChooser();

const client = httpService.client;

class BBlockService {

  constructor() {
    this._registerLoadCallbacks = [];
    this.localRegister = null;
    this.registers = {};
    this.registerPromises = {
      local: outsidePromise(),
      all: outsidePromise(),
    };
    this.errorRegisters = {};
    this.loadedRegistersCount = 0;
    this.bblocks = {
      local: {},
      all: {},
    };
    this.bblockPromises = {
      local: outsidePromise(),
      all: outsidePromise(),
    };

    // URL to bblock mappings for quick lookup
    this.resourceMappings = {};

    this._loadRegister(configService.register, true);
  }

  async _loadRegister(url, isLocal, importLevel = 0) {
    if (url === DEFAULT_BBLOCKS_REGISTER_MARKER) {
      url = DEFAULT_BBLOCKS_REGISTER;
    }
    if (this.registers[url]) {
      // already loaded, or loading
      return new Promise(() => true);
    }
    this.registers[url] = {};
    return client.get(url)
      .catch(e => {
        this.errorRegisters[url] = {
          'error': e,
        };
        let remoteCacheDir = this.localRegister?.remoteCacheDir;
        if (remoteCacheDir) {
          const hash = sha256(url);
          if (remoteCacheDir.slice(-1) !== '/') {
            remoteCacheDir += '/';
          }
          return client.get(remoteCacheDir + hash)
            .then(r => ({ fromCache: true, response: r}));
        }
        throw e;
      })
      .then(resp => {
        const fromCache = resp.fromCache || false;
        if (fromCache) {
          resp = resp.response;
        }
        let registerImports = [];
        if (Array.isArray(resp.data)) {
          // legacy register.json, only bblocks array
          this.registers[url] = {
            local: isLocal,
            url,
            importLevel,
            bblocks: resp.data,
            fromCache,
          };
        } else {
          this.registers[url] = {
            ...resp.data,
            local: isLocal,
            url,
            importLevel,
            fromCache,
          };
          if (Array.isArray(resp.data.imports)) {
            registerImports = resp.data.imports;
          }
        }
        this.registers[url].color = registerPalette(url);
        if (!this.registers[url].name) {
          this.registers[url].name = url.replace(/(\/build)?\/[^/]+\.json$/, '')
            .replace(/^.*\//, '');
        }

        if (isLocal) {
          this.localRegister = this.registers[url];
        }

        if (registerImports?.length) {
          registerImports
            .filter(u => !this.registers[u])
            .forEach(u => this._loadRegister(u, false, importLevel + 1));
        }

        return url;
      })
      .then(url => {
        const bblocks = this.registers[url].bblocks;
        for (let bblock of bblocks) {
          if (bblock.itemIdentifier in this.bblocks.all) {
            continue;
          }
          bblock['local'] = isLocal;
          bblock['importLevel'] = importLevel;
          bblock['register'] = {
            url,
            name: this.registers[url].name,
            color: this.registers[url].color,
          };
          this.bblocks.all[bblock.itemIdentifier] = bblock;
          if (isLocal) {
            this.bblocks.local[bblock.itemIdentifier] = bblock;
          }

          if (bblock.schema) {
            for (let url of Object.values(bblock.schema)) {
              this.resourceMappings[url] = bblock.itemIdentifier;
            }
            if (bblock.sourceSchema) {
              this.resourceMappings[bblock.sourceSchema] = bblock.itemIdentifier;
            }
          }
          if (bblock.openAPIDocument) {
            console.log('adding', bblock.openAPIDocument)
            this.resourceMappings[bblock.openAPIDocument] = bblock.itemIdentifier;
            if (bblock.sourceOpenAPIDocument) {
              this.resourceMappings[bblock.sourceOpenAPIDocument] = bblock.itemIdentifier;
            }
          }

          // Load legacy shaclRules if present
          if (bblock.shaclRules && !bblock.shaclShapes) {
            bblock.shaclShapes = bblock.shaclRules;
            delete bblock.shaclRules;
          }

        }
        this.loadedRegistersCount++;
        if (isLocal) {
          this.bblockPromises.local.resolve(this.bblocks.local);
          this.registerPromises.local.resolve(this.localRegister);
        }
        if (this.loadedRegistersCount === Object.keys(this.registers).length) {
          this.bblockPromises.all.resolve(this.bblocks.all);
          this.registerPromises.all.resolve(this.registers);
        }
        return bblocks;
      })
      .catch(e => {
        console.log('Error loading register', e);
        this.errorRegisters[url] = {
          'error': e,
        };
      })
      .finally(() => {
        this._onRegisterLoad();
      });
  }

  getBBlocks(includeRemote = false) {
    return includeRemote ? this.bblockPromises.all.promise : this.bblockPromises.local.promise;
  }

  _onRegisterLoad() {
    if (this._registerLoadCallbacks.length) {
      this._registerLoadCallbacks.forEach(cb => cb(this.registers, this.loadedRegistersCount, this.errorRegisters));
    }
  }

  onRegisterLoad(callback) {
    if (callback) {
      this._registerLoadCallbacks.push(callback);
      if (Object.keys(this.registers).length) {
        callback(this.registers, this.loadedRegistersCount, this.errorRegisters);
      }
    }
  }

  async fetchBBlock(id) {
    let bblocks = await this.bblockPromises.local.promise;
    if (!bblocks[id]) {
      bblocks = await this.bblockPromises.all.promise;
    }
    const bblock = bblocks[id];
    const jsonFullUrl = bblock.documentation['json-full'].url;
    const resp = await client.get(jsonFullUrl);
    const data = resp.data;

    // Load legacy shaclRules if present
    if (data.shaclRules && !data.shaclShapes) {
      data.shaclShapes = data.shaclRules;
      delete data.shaclRules;
    }

    // Copy properties added on post-processing
    COPY_PROPERTIES.forEach(p => data[p] = bblock[p]);

    return data;
  }

  getRegisters(all = false) {
    return all ? this.registerPromises.all.promise : this.registerPromises.local.promise;
  }

  async fetchLdContext(bblock) {
    return this.fetchDocument(bblock, 'ldContext');
  }

  async fetchSourceLdContext(bblock) {
    return this.fetchDocument(bblock, 'sourceLdContext');
  }

  async fetchSourceSchema(bblock) {
    return this.fetchDocument(bblock, 'sourceSchema');
  }

  fetchDocument(bblock, property) {
    let propertyValue;
    property = property.slice();
    if (Array.isArray(property)) {
      propertyValue = bblock[property.shift()];
      while (propertyValue && property.length) {
        propertyValue = propertyValue[property.shift()];
      }
    } else {
      propertyValue = bblock[property];
    }
    if (propertyValue) {
      return this.fetchDocumentByUrl(bblock, propertyValue);
    }
    return Promise.resolve(null);
  }

  fetchDocumentByUrl(bblock, url) {
    return client.get(url, {responseType: 'text'})
      .catch(e => {
        if (bblock['remoteCacheDir']) {
          // Try with cache
          const hash = sha256(url);
          let remoteCacheDir = bblock['remoteCacheDir'];
          if (remoteCacheDir.slice(-1) !== '/') {
            remoteCacheDir += '/';
          }
          return client.get(remoteCacheDir + hash);
        }
        throw e;
      })
      .then(r => r.data);
  }

  isShown(bblockOrImportLevel) {
    const showLevel = configService.config.showImported;
    if (showLevel === true) {
      return true;
    }
    if (bblockOrImportLevel === 0 || bblockOrImportLevel.importLevel === 0 || bblockOrImportLevel.local) {
      return true;
    }
    if (!showLevel) {
      return false;
    }
    if (typeof bblockOrImportLevel === 'number') {
      return showLevel >= bblockOrImportLevel;
    }
    return bblockOrImportLevel.local || showLevel >= bblockOrImportLevel.importLevel;
  }

  async findResource(url) {
    await this.registerPromises.all.promise;
    if (this.resourceMappings[url]) {
      return this.bblocks.all[this.resourceMappings[url]];
    }
  }

}

export default new BBlockService();
