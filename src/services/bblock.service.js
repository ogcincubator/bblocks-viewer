import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const REGISTER_BASE = 'https://opengeospatial.github.io/bblocks/'
const REGISTER_JSON = 'register.json';
const BBLOCK_JSON_BASE = 'generateddocs/json-full/';

const baseClient = axios.create({
//const client = axios.create({
  baseURL: REGISTER_BASE,
});
const client = setupCache(baseClient, {
  cacheTakeover: false, // This is necessary for GitHub pages, since CORS preflight is not supported
});

const idToPath = id => id.split('.').slice(1).join('/');

class BBlockService {

  getBBlocks() {
    return client.get(REGISTER_JSON)
      .then(resp => resp.data);
  }

  getBBlock(id) {
    const path = idToPath(id);
    return client.get(`${BBLOCK_JSON_BASE}${path}/index.json`)
      .then(resp => resp.data);
  }

}
export default new BBlockService();
