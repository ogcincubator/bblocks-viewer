import axios from 'axios';
import {setupCache} from 'axios-cache-interceptor';
import configService from '@/services/config.service';
import {createChooser, defaultPalette} from "@/models/colors";
import {outsidePromise} from "@/lib/utils";

const baseClient = axios.create({
  timeout: 3000,
});
const client = setupCache(baseClient, {
  cacheTakeover: false, // This is necessary for GitHub pages, since CORS preflight is not supported
});

const DEFAULT_BBLOCKS_REGISTER = 'https://opengeospatial.github.io/bblocks/register.json';
const DEFAULT_BBLOCKS_REGISTER_MARKER = 'default';

const COPY_PROPERTIES = ['local', 'register']

const registerPalette = createChooser();

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
    this._loadRegister(configService.register, true);
  }

  _loadRegister(url, isLocal) {
    if (url === DEFAULT_BBLOCKS_REGISTER_MARKER) {
      url = DEFAULT_BBLOCKS_REGISTER;
    }
    if (this.registers[url]) {
      // already loaded, or loading
      return new Promise(() => true);
    }
    this.registers[url] = {};
    return client.get(url)
      .then(resp => {
        if (Array.isArray(resp.data)) {
          // legacy register.json, only bblocks array
          this.registers[url] = {
            local: isLocal,
            url,
            bblocks: resp.data,
          };
        } else {
          this.registers[url] = {
            ...resp.data,
            local: isLocal,
            url,
          };
          if (Array.isArray(resp.data.imports)) {
            resp.data.imports
              .filter(u => !this.registers[u])
              .forEach(u => this._loadRegister(u, false));
          }
        }
        this.registers[url].color = registerPalette(url);
        if (!this.registers[url].name) {
          this.registers[url].name = url.replace(/(\/build)?\/[^\/]+\.json$/, '')
            .replace(/^.*\//, '');
        }

        if (isLocal) {
          this.localRegister = this.registers[url];
        }

        return url;
      })
      .then(url => {
        const bblocks = this.registers[url].bblocks;
        for (let bblock of bblocks) {
          bblock['local'] = isLocal;
          bblock['register'] = {
            url,
            name: this.registers[url].name,
            color: this.registers[url].color,
          };
          this.bblocks.all[bblock.itemIdentifier] = bblock;
          if (isLocal) {
            this.bblocks.local[bblock.itemIdentifier] = bblock;
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

    // Copy properties added on post-processing
    COPY_PROPERTIES.forEach(p => data[p] = bblock[p]);

    return data;
  }

  getRegisters(all = false) {
    return all ? this.registerPromises.all.promise : this.registerPromises.local.promise;
  }

  async fetchLdContext(bblock) {
    if (bblock.ldContext) {
      return (await client.get(bblock.ldContext, { responseType: "text" })).data;
    }
    return null;
  }

  async fetchSourceLdContext(bblock) {
    if (bblock.sourceLdContext) {
      return (await client.get(bblock.sourceLdContext, { responseType: "text" })).data;
    }
    return null;
  }

}

export default new BBlockService();
