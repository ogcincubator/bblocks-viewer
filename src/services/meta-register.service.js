import httpService from "@/services/http.service";

const META_REGISTER_BACKEND = 'https://defs-dev.opengis.net/bblocks-meta-register-backend';
export const META_REGISTER_UI = 'https://defs-dev.opengis.net/bblocks-meta-register';

const client = httpService.client;

/**
 * Looks up a register.json URL against the OGC Blocks meta-registry backend.
 * Returns the register's meta-registry detail (including its `id`, of the
 * form `org/register`), or null if the register is not indexed there.
 */
function checkRegister(registerUrl) {
  return client.get(`${META_REGISTER_BACKEND}/registers/by-url`, {
    params: {url: registerUrl},
    validateStatus: status => status === 200 || status === 404,
  }).then(resp => resp.status === 200 ? resp.data : null)
    .catch(() => null);
}

export default {
  checkRegister,
  META_REGISTER_UI,
};
