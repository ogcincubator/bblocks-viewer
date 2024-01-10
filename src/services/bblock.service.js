import axios from 'axios';
import {setupCache} from 'axios-cache-interceptor';
import configService from '@/services/config.service';
import {createChooser, defaultPalette} from "@/models/colors";

const baseClient = axios.create();
const client = setupCache(baseClient, {
  cacheTakeover: false, // This is necessary for GitHub pages, since CORS preflight is not supported
});

const DEFAULT_BBLOCKS_REGISTER = 'https://opengeospatial.github.io/bblocks/register.json';
const DEFAULT_BBLOCKS_REGISTER_MARKER = 'default';

const COPY_PROPERTIES = ['local', 'register']

const allRegisters = {};
const localBBlocks = {};
const remoteBBlocks = {};
let loadedRegisters = 0;
let loadRegistersPromiseResolve;
const loadRegistersPromise = new Promise(r => loadRegistersPromiseResolve = r);
const registerPalette = createChooser();

const loadRegister = async (url, isLocal, callback) => {
  if (url === DEFAULT_BBLOCKS_REGISTER_MARKER) {
    url = DEFAULT_BBLOCKS_REGISTER;
  }
  if (allRegisters[url]) {
    // already loaded, or loading
    return true;
  }
  allRegisters[url] = {};
  return client.get(url)
    .then(resp => {
      if (Array.isArray(resp.data)) {
        // legacy register.json, only bblocks array
        allRegisters[url] = {
          local: isLocal,
          url,
          bblocks: resp.data,
        };
      } else {
        allRegisters[url] = {
          ...resp.data,
          local: isLocal,
          url,
        };
        if (Array.isArray(resp.data.imports)) {
          resp.data.imports
            .filter(u => !allRegisters[u])
            .forEach(u => loadRegister(u, false, callback));
        }
      }
      allRegisters[url].color = registerPalette(url);
      if (!allRegisters[url].name) {
        allRegisters[url].name = url.replace(/(\/build)?\/[^\/]+\.json$/, '')
          .replace(/^.*\//, '');
      }
      return url;
    })
    .then(url => {
      const bblocks = allRegisters[url].bblocks
      for (let bblock of bblocks) {
        bblock['local'] = isLocal;
        bblock['register'] = {
          url,
          name: allRegisters[url].name,
          color: allRegisters[url].color,
        };
        (isLocal ? localBBlocks : remoteBBlocks)[bblock.itemIdentifier] = bblock;
      }
      loadedRegisters++;
      if (loadedRegisters === Object.keys(allRegisters).length) {
        loadRegistersPromiseResolve({...remoteBBlocks, ...localBBlocks});
      }
      if (callback) {
        callback();
      }
      return bblocks;
    });
};

class BBlockService {

  constructor() {
    this._registerLoadCallbacks = [];
    this.bblocksPromise = Promise.all(
      configService.registers.map(url => loadRegister(url, true, () => this._onRegisterLoad())))
      .then(() => localBBlocks);
  }

  getBBlocks(includeRemote = false) {
    return includeRemote ? loadRegistersPromise : this.bblocksPromise;
  }

  _onRegisterLoad() {
    if (this._registerLoadCallbacks.length) {
      this._registerLoadCallbacks.forEach(cb => cb(allRegisters, loadedRegisters));
    }
  }

  onRegisterLoad(callback) {
    if (callback) {
      this._registerLoadCallbacks.push(callback);
      callback(allRegisters, loadedRegisters);
    }
  }

  async fetchBBlock(id) {
    let bblocks = await this.bblocksPromise;
    if (!bblocks[id]) {
      bblocks = await loadRegistersPromise;
    }
    const bblock = bblocks[id];
    const jsonFullUrl = bblock.documentation['json-full'].url;
    const resp = await client.get(jsonFullUrl);
    const data = resp.data;

    // Copy properties added on post-processing
    COPY_PROPERTIES.forEach(p => data[p] = bblock[p]);

    return data;
  }

  getBBlockSlateLink(id) {
    return localBBlocks?.[id]?.documentation?.slate?.url;
  }

  getAllRegisters() {
    return loadRegistersPromise.then(() => allRegisters);
  }

  async fetchLdContext(bblock) {
    if (bblock.ldContext) {
      return (await client.get(bblock.ldContext, { responseType: "text" })).data;
    }
    return null;
  }

}

export default new BBlockService();
