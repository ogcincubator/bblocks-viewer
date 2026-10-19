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

const REGISTER_TIMEOUT = 10000;
const REGISTER_RETRIES = 2;
const REGISTER_RETRY_DELAY = 500;

function isTransientError(e) {
  if (e?.response) {
    return e.response.status >= 500;
  }
  return ['ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK'].includes(e?.code);
}

function describeLoadError(e) {
  if (e?.response) {
    const status = e.response.status;
    return `The server responded with HTTP ${status}${e.response.statusText ? ' ' + e.response.statusText : ''}` +
      (status === 404 ? ' (register not found at this URL)' : '') + '.';
  }
  if (e?.code === 'ECONNABORTED' || e?.code === 'ETIMEDOUT') {
    return `The request timed out after ${REGISTER_TIMEOUT / 1000}s. The server may be slow or overloaded; try reloading.`;
  }
  if (e?.code === 'ERR_NETWORK') {
    return 'The request could not be completed (network error). The server may be down or unreachable, or it may be ' +
      'blocking cross-origin (CORS) requests.';
  }
  return e?.message || String(e);
}

async function getRegisterDocument(url) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await client.get(url, {timeout: REGISTER_TIMEOUT});
    } catch (e) {
      if (attempt >= REGISTER_RETRIES || !isTransientError(e)) {
        throw e;
      }
      await new Promise(resolve => setTimeout(resolve, REGISTER_RETRY_DELAY * (attempt + 1)));
    }
  }
}

class BBlockService {

  constructor() {
    this._registerLoadCallbacks = [];
    this.localRegister = null;
    this.registers = {};
    this.registerPromises = {
      local: outsidePromise(),
      all: outsidePromise(),
    };
    this._pluginByTypePromise = this.registerPromises.local.promise.then(register => {
      const map = {};
      for (const plugin of (register?.transformPlugins || [])) {
        for (const mod of (plugin.modules || [])) {
          for (const transformer of (mod.transformers || [])) {
            for (const type of (transformer.types || [])) {
              map[type] = {pip: plugin.pip, urls: plugin.urls || [], module: mod.module, className: transformer.class};
            }
          }
        }
      }
      return map;
    });
    this.errorRegisters = {};
    this.warningRegisters = {};
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
    return getRegisterDocument(url)
      .catch(e => {
        let remoteCacheDir = this.localRegister?.remoteCacheDir;
        if (remoteCacheDir) {
          const hash = sha256(url);
          if (remoteCacheDir.slice(-1) !== '/') {
            remoteCacheDir += '/';
          }
          return client.get(remoteCacheDir + hash)
            .then(r => ({fromCache: true, response: r, reason: describeLoadError(e)}))
            .catch(() => {
              throw e;
            });
        }
        throw e;
      })
      .then(resp => {
        const fromCache = resp.fromCache || false;
        if (fromCache) {
          this.warningRegisters[url] = {
            message: `The live register could not be loaded, so a cached copy was used and it may be outdated. ${resp.reason}`,
          };
          resp = resp.response;
        }
        if (!resp.data || typeof resp.data !== 'object' ||
            !Array.isArray(Array.isArray(resp.data) ? resp.data : resp.data.bblocks)) {
          throw new Error('The response is not a valid register.json document (no "bblocks" list found).');
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
          if (this.localRegister?.viewer?.showImported !== undefined) {
            configService.setShowImported(this.localRegister.viewer.showImported);
          }
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
          'message': describeLoadError(e),
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
      this._registerLoadCallbacks.forEach(cb => cb(this.registers, this.loadedRegistersCount, this.errorRegisters, this.warningRegisters));
    }
  }

  onRegisterLoad(callback) {
    if (callback) {
      this._registerLoadCallbacks.push(callback);
      if (Object.keys(this.registers).length) {
        callback(this.registers, this.loadedRegistersCount, this.errorRegisters, this.warningRegisters);
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

  getPluginByType() {
    return this._pluginByTypePromise;
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

  // maxSize aborts the download once more than that many bytes have arrived — for callers that
  // only need a bounded preview and would rather stop early than buffer an arbitrarily large body
  fetchDocumentByUrl(bblock, url, {maxSize} = {}) {
    const controller = maxSize ? new AbortController() : undefined;
    const config = {
      responseType: 'text',
      signal: controller?.signal,
      onDownloadProgress: maxSize ? (e) => {
        if (e.loaded > maxSize) {
          controller.abort();
        }
      } : undefined,
    };
    return client.get(url, config)
      .catch(e => {
        if (controller?.signal.aborted) {
          const tooLargeError = new Error(`Content at ${url} exceeds the ${maxSize}-byte preview limit`);
          tooLargeError.tooLarge = true;
          throw tooLargeError;
        }
        if (bblock['remoteCacheDir']) {
          // Try with cache — reuse the same signal/onDownloadProgress so the size guard still applies
          const hash = sha256(url);
          let remoteCacheDir = bblock['remoteCacheDir'];
          if (remoteCacheDir.slice(-1) !== '/') {
            remoteCacheDir += '/';
          }
          return client.get(remoteCacheDir + hash, config)
            .catch(e2 => {
              if (controller?.signal.aborted) {
                const tooLargeError = new Error(`Content at ${remoteCacheDir}${hash} exceeds the ${maxSize}-byte preview limit`);
                tooLargeError.tooLarge = true;
                throw tooLargeError;
              }
              throw e2;
            });
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
