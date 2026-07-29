import satisfies from 'semver/functions/satisfies.js';

// See .claude/shared-dependency-resolver-design.md for the full design rationale. Summary: lets
// independently-versioned view plugins (first-party or third-party) share one runtime instance of
// a heavy dependency (e.g. three) when their required versions are compatible, without the host
// owning a page-wide import map or plugins needing to agree on a literal CDN URL.
//
// Invariant: resolve() must stay synchronous up through the cache write (the `entries.push(...)`
// below) — no `async`, no `await` before it. JS being single-threaded means a plain synchronous
// function that registers `{version, promise}` before returning can never be interleaved with
// another call, so whichever plugin calls resolve() first atomically stakes its claim; every later
// caller (a microtask or an entire render cycle later) that finds a compatible entry gets handed
// that same promise back, indistinguishable from "the module was already loaded". If this is ever
// rewritten as `async resolve(...)` with an `await` before the cache write, the race comes back:
// two concurrent callers could both see an empty cache and both invoke their own `load()`.
export class DependencyResolver {
  constructor() {
    // Not a private (#) field: kept as a plain underscore-prefixed instance property to match this
    // codebase's existing convention for internal-only state (see bblock.service.js's
    // _pluginByTypePromise) rather than introducing ES2022 class-field syntax on its own.
    this._cache = new Map(); // name -> Array<{ version, promise }>
  }

  resolve({name, range, version, load}) {
    const entries = this._cache.get(name) ?? [];
    const hit = entries.find(e => satisfies(e.version, range));
    if (hit) return hit.promise;
    const entry = {version, promise: null};
    // Evict on rejection (splice by identity, not by version): a transient failure — e.g. the CDN
    // being briefly unreachable — must not permanently poison this cache slot for the rest of the
    // session. The next caller after a failure re-runs load() and, on success, repopulates the
    // cache for everyone after it. Splicing by object identity (rather than matching on `version`)
    // stays correct even if two entries for the same name/version were ever registered.
    entry.promise = Promise.resolve().then(load).catch((err) => {
      const list = this._cache.get(name);
      const idx = list?.indexOf(entry) ?? -1;
      if (idx !== -1) list.splice(idx, 1);
      throw err;
    });
    entries.push(entry);
    this._cache.set(name, entries);
    return entry.promise;
  }
}
