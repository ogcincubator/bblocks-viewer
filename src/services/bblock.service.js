import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import configService from '@/services/config.service';
import {defaultPalette} from "@/models/colors";

const baseClient = axios.create();
const client = setupCache(baseClient, {
  cacheTakeover: false, // This is necessary for GitHub pages, since CORS preflight is not supported
});

const DEFAULT_BBLOCKS_REGISTER = 'https://opengeospatial.github.io/bblocks/register.json';
const DEFAULT_BBLOCKS_REGISTER_MARKER = 'default';

const allRegisters = {};
const localBBlocks = {};
const remoteBBlocks = {};
let loadedRegisters = 0;

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
      return allRegisters[url].bblocks;
    })
    .then(bblocks => {
      for (let bblock of bblocks) {
        bblock['local'] = isLocal;
        (isLocal ? localBBlocks : remoteBBlocks)[bblock.itemIdentifier] = bblock;
      }
      loadedRegisters++;
      if (callback) {
        callback();
      }
      return bblocks;
    });
};

const idToPath = id => id.split('.').slice(1).join('/');

class BBlockService {

  constructor() {
    this._registerLoadCallbacks = [];
    this.groupMap = {};
    this.groups = [];
    this.bblocksPromise = Promise.all(
        configService.registers.map(url => loadRegister(url, true, () => this._onRegisterLoad())))
      .then(() => {
        Object.values(localBBlocks).filter(b => !!b.group).forEach(bblock => {
          if (!this.groupMap[bblock.group]) {
            const gc = {
              label: bblock.group,
              color: defaultPalette[this.groups.length % defaultPalette.length],
            };
            this.groups.push(gc);
            this.groupMap[bblock.group] = gc;
          }
          bblock.groupColor = this.groupMap[bblock.group].color;
        });
        return localBBlocks;
      });
  }

  getBBlocks() {
    return this.bblocksPromise;
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

  async getBBlock(id) {
    const bblocks = await this.bblocksPromise;
    const jsonFullUrl = bblocks[id].documentation['json-full'].url;
    return client.get(jsonFullUrl)
      .then(resp => resp.data);
  }

  getBBlockSlateLink(id) {
    const path = idToPath(id);
    return `https://opengeospatial.github.io/bblocks/generateddocs/slate-build/${path}/`;
  }

  getGroups() {
    return this.bblocksPromise.then(() => this.groups);
  }

}
export default new BBlockService();
