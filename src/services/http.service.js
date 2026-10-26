import axios from "axios";
import {setupCache} from "axios-cache-interceptor";

const baseClient = axios.create({
  timeout: 3000,
});
const client = setupCache(baseClient, {
  cacheTakeover: false, // This is necessary for GitHub pages, since CORS preflight is not supported
});

// Local URL mappings (remote URL prefix -> locally served prefix), injected into
// window.bblocksViewer by the Docker entrypoint when the register was built with
// bblocks-config-local.yml, so that local copies of upstream registers are used.
const localUrlMappings = Object.entries(window.bblocksViewer?.localUrlMappings || {})
  .map(([prefix, target]) => [prefix.replace(/\/+$/, ''), target.replace(/\/+$/, '')])
  .sort(([a], [b]) => b.length - a.length);

if (localUrlMappings.length) {
  client.interceptors.request.use((request) => {
    const url = request.url;
    if (typeof url === 'string') {
      const mapping = localUrlMappings.find(([prefix]) => url === prefix || url.startsWith(prefix + '/'));
      if (mapping) {
        request.url = mapping[1] + url.substring(mapping[0].length);
      }
    }
    return request;
  });
}

export default {
  client,
};
