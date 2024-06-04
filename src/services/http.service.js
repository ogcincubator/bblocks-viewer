import axios from "axios";
import {setupCache} from "axios-cache-interceptor";

const baseClient = axios.create({
  timeout: 3000,
});
const client = setupCache(baseClient, {
  cacheTakeover: false, // This is necessary for GitHub pages, since CORS preflight is not supported
});

export default {
  client,
};
