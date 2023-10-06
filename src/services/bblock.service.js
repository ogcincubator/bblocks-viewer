import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const REGISTER_BASE = 'https://opengeospatial.github.io/bblocks/'
const REGISTER_JSON = 'register.json';

const baseClient = axios.create({
  baseURL: REGISTER_BASE,
});
const client = setupCache(baseClient, {
  cacheTakeover: false, // This is necessary for GitHub pages, since CORS preflight is not supported
});

const idToPath = id => id.split('.').slice(1).join('/');

const bblocksPromise = new Promise(resolve => {
  client.get(REGISTER_JSON)
    .then(resp => Array.isArray(resp.data) ? resp.data : resp.data.bblocks)
    .then(bblocks => {
      const byIdx = {};
      for (let bblock of bblocks) {
        byIdx[bblock.itemIdentifier] = bblock;
      }
      resolve(byIdx);
    });
});

class BBlockService {

  getBBlocks() {
    return bblocksPromise;
  }

  async getBBlock(id) {
    const bblocks = await bblocksPromise;
    const jsonFullUrl = bblocks[id].documentation['json-full'].url;
    return client.get(jsonFullUrl)
      .then(resp => resp.data);
  }

  getBBlockSlateLink(id) {
    const path = idToPath(id);
    return `https://opengeospatial.github.io/bblocks/generateddocs/slate-build/${path}/`;
  }

}
export default new BBlockService();
