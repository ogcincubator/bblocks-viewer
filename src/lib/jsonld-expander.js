export const CURIE_MARKER = '';

function buildPrefixMap(contextObj, parent) {
  const map = { ...parent };
  for (const [key, value] of Object.entries(contextObj)) {
    if (key.startsWith('@')) continue;
    if (typeof value === 'string' && /^https?:\/\//.test(value)) {
      map[key] = value;
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      const id = value['@id'];
      if (typeof id === 'string' && /^https?:\/\//.test(id)) {
        map[key] = id;
      }
    }
  }
  return map;
}

function tryExpand(value, prefixMap) {
  if (!value || typeof value !== 'string' || value.startsWith('@')) return null;
  if (/^https?:\/\//.test(value)) return null; // absolute URI — autolink handles it
  const colon = value.indexOf(':');
  if (colon > 0) {
    const prefix = value.substring(0, colon);
    const local = value.substring(colon + 1);
    if (prefixMap[prefix]) return prefixMap[prefix] + local;
  }
  return null;
}

function mark(value, prefixMap) {
  const uri = tryExpand(value, prefixMap);
  return uri ? value + CURIE_MARKER + uri : value;
}

// Returns { value, map } where map is the prefix map active after this context.
function processContext(ctx, parentMap = {}) {
  if (Array.isArray(ctx)) {
    let map = { ...parentMap };
    const items = ctx.map(item => {
      const r = processContext(item, map);
      map = r.map;
      return r.value;
    });
    return { value: items, map };
  }

  if (typeof ctx !== 'object' || ctx === null) {
    return { value: ctx, map: parentMap };
  }

  const prefixMap = buildPrefixMap(ctx, parentMap);
  const result = {};

  for (const [key, value] of Object.entries(ctx)) {
    // Leave JSON-LD control keywords as-is (except we still descend into @context below)
    if (key.startsWith('@')) {
      result[key] = value;
      continue;
    }

    if (typeof value === 'string') {
      result[key] = mark(value, prefixMap);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      const termDef = {};
      let scopedMap = prefixMap;

      if (value['@context'] !== undefined) {
        const scopedCtx = processContext(value['@context'], prefixMap);
        termDef['@context'] = scopedCtx.value;
        scopedMap = scopedCtx.map;
      }

      for (const [k, v] of Object.entries(value)) {
        if (k === '@context') continue;
        if ((k === '@id' || k === '@type') && typeof v === 'string') {
          termDef[k] = mark(v, scopedMap);
        } else {
          termDef[k] = v;
        }
      }
      result[key] = termDef;
    } else {
      result[key] = value;
    }
  }

  return { value: result, map: prefixMap };
}

export function expandCuriesInContext(jsonStr) {
  let parsed;
  try { parsed = JSON.parse(jsonStr); } catch { return jsonStr; }
  if (typeof parsed !== 'object' || parsed === null) return jsonStr;

  const hasContextKey = '@context' in parsed;
  const ctx = hasContextKey ? parsed['@context'] : parsed;
  const { value } = processContext(ctx);
  const expanded = hasContextKey ? { ...parsed, '@context': value } : value;
  return JSON.stringify(expanded, null, 2);
}
