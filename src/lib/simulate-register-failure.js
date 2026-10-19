/**
 * Dev-only helper to exercise the register load failure UI without needing a broken register.
 *
 * `?simFail=<url substring>[,nocache]` (and `simFail2`, same syntax) make every register whose URL contains
 * the substring fail to load with a fake timeout. Unless `nocache` is given, loading from the remote cache is
 * simulated too (by fetching the real URL), so the register ends up as a "loaded from cache" warning instead
 * of an error.
 *
 * Does nothing in production builds.
 */
const PARAMS = ['simFail', 'simFail2'];

export function simulatedRegisterFailure(url) {
  if (!import.meta.env.DEV) {
    return null;
  }
  for (const param of PARAMS) {
    const value = new URLSearchParams(window.location.search).get(param);
    if (!value) {
      continue;
    }
    const [substr, flag] = value.split(',');
    if (substr && url.includes(substr)) {
      return {noCache: flag === 'nocache'};
    }
  }
  return null;
}
