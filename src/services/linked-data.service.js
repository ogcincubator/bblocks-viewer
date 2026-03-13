/**
 * Linked Data service: fetches RDF resources and extracts label/description.
 *
 * Fetch strategy (stops at first success):
 *   1. Direct GET with RDF Accept header
 *   2. Each Rainbow proxy in config.bblocksFallbackRainbowInstances (string or array)
 *   3. Each SPARQL endpoint in config.bblocksFallbackSparqlEndpoints (string or array)
 *
 * Parsing:
 *   - Turtle / N-Triples / N-Quads / TriG / N3 → N3.js (already bundled)
 *   - application/ld+json → jsonld (dynamic import)
 *   - application/rdf+xml → rdfxml-streaming-parser (dynamic import)
 */

import N3 from 'n3';
import configService from '@/services/config.service';

// ── Predicate lists (same as jsonld-ui-utils/constants.ts) ─────────────────

const LABEL_PREDICATES = [
  'http://www.w3.org/2004/02/skos/core#prefLabel',
  'http://purl.org/dc/terms/title',
  'http://purl.org/dc/elements/1.1/title',
  'https://schema.org/name',
  'http://xmlns.com/foaf/0.1/name',
  'http://www.w3.org/2000/01/rdf-schema#label',
];

const DESCRIPTION_PREDICATES = [
  'http://www.w3.org/2004/02/skos/core#definition',
  'http://purl.org/dc/terms/description',
  'http://purl.org/dc/elements/1.1/description',
  'http://www.w3.org/2000/01/rdf-schema#comment',
];

// ── Content-type handling ───────────────────────────────────────────────────

// Formats N3.Parser understands natively.
// 'text/anot+turtle' is an OGC-specific variant of Turtle.
const N3_TYPES = new Set([
  'text/turtle',
  'text/n3',
  'application/n-triples',
  'application/n-quads',
  'application/trig',
  'text/anot+turtle',
]);

const ACCEPT_HEADER = [
  'text/turtle',
  'application/n-triples',
  'application/n-quads',
  'application/trig',
  'application/ld+json',
  'application/rdf+xml',
].join(', ');

// ── N3 helpers ──────────────────────────────────────────────────────────────

function findInStore(store, subjectUri, predicates) {
  const subj = N3.DataFactory.namedNode(subjectUri);
  for (const predUri of predicates) {
    const quads = store
      .getQuads(subj, N3.DataFactory.namedNode(predUri), null, null)
      .filter(q => q.object.termType === 'Literal');
    if (!quads.length) continue;
    const en = quads.find(q => q.object.language === 'en');
    const noLang = quads.find(q => !q.object.language);
    return (en ?? noLang ?? quads[0]).object.value;
  }
  return null;
}

function parseTurtle(text, baseIRI, contentType) {
  const store = new N3.Store();
  // N3.Parser doesn't recognise 'text/anot+turtle'; treat it as Turtle.
  const format = contentType === 'text/anot+turtle' ? 'text/turtle' : contentType;
  const parser = new N3.Parser({ baseIRI, format });
  return new Promise((resolve, reject) => {
    parser.parse(text, (err, quad) => {
      if (err) return reject(err);
      if (quad) store.addQuad(quad);
      else resolve(store);
    });
  });
}

async function parseJsonLd(text, baseIRI) {
  // Dynamic import keeps jsonld out of the main bundle when not needed.
  const jsonld = (await import('jsonld')).default;
  const doc = JSON.parse(text);
  const nquads = await jsonld.toRDF(doc, {
    format: 'application/n-quads',
    base: baseIRI,
  });
  return parseTurtle(nquads, baseIRI, 'application/n-quads');
}

function parseRdfXml(text, baseIRI) {
  // Dynamic import — rdfxml-streaming-parser is only loaded on demand.
  return import('rdfxml-streaming-parser').then(({ RdfXmlParser }) => {
    const store = new N3.Store();
    return new Promise((resolve, reject) => {
      const parser = new RdfXmlParser({ baseIRI });
      parser.on('data', quad => store.addQuad(quad));
      parser.on('error', reject);
      parser.on('end', () => resolve(store));
      parser.write(text);
      parser.end();
    });
  });
}

// ── Fetch helpers ───────────────────────────────────────────────────────────

async function tryFetch(url, accept) {
  const response = await fetch(url, { headers: { Accept: accept } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const contentType = response.headers.get('content-type')?.split(';')[0].trim() || 'text/turtle';
  return { text: await response.text(), contentType };
}

async function fetchViaRainbow(uri, rainbowBase) {
  const rainbowUrl = new URL(rainbowBase);
  rainbowUrl.searchParams.set('uri', uri);
  return tryFetch(rainbowUrl.toString(), ACCEPT_HEADER);
}

async function fetchViaSparql(uri, endpoint) {
  const body = new URLSearchParams({ query: `DESCRIBE <${uri}>` });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/turtle, application/n-triples',
    },
    body: body.toString(),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const contentType = response.headers.get('content-type')?.split(';')[0].trim() || 'text/turtle';
  return { text: await response.text(), contentType };
}

// ── Core fetch-and-parse ────────────────────────────────────────────────────

const toArray = v => !v ? [] : Array.isArray(v) ? v : [v];

async function parseRdfResult({ text, contentType }, uri) {
  let store;
  if (N3_TYPES.has(contentType)) {
    store = await parseTurtle(text, uri, contentType);
  } else if (contentType === 'application/ld+json') {
    store = await parseJsonLd(text, uri);
  } else if (contentType === 'application/rdf+xml') {
    store = await parseRdfXml(text, uri);
  } else {
    return null;
  }
  const label = findInStore(store, uri, LABEL_PREDICATES);
  if (!label) return null; // successful response but no data for this URI
  return { uri, label, description: findInStore(store, uri, DESCRIPTION_PREDICATES) };
}

async function trySource(fetchFn, uri) {
  try {
    return await parseRdfResult(await fetchFn(), uri);
  } catch (_) {
    return null;
  }
}

async function actualFetchResource(uri) {
  const {
    bblocksFallbackRainbowInstances,
    bblocksFallbackSparqlEndpoints,
  } = configService.config;
  const rainbowList = toArray(bblocksFallbackRainbowInstances);
  const sparqlList  = toArray(bblocksFallbackSparqlEndpoints);

  // 1. Direct
  let result = await trySource(() => tryFetch(uri, ACCEPT_HEADER), uri);

  // 2. Rainbow proxies (in order)
  for (const base of rainbowList) {
    if (result) break;
    result = await trySource(() => fetchViaRainbow(uri, base), uri);
  }

  // 3. SPARQL endpoints (in order)
  for (const endpoint of sparqlList) {
    if (result) break;
    result = await trySource(() => fetchViaSparql(uri, endpoint), uri);
  }

  if (!result) {
    throw new Error(`No label data found for <${uri}>`);
  }
  return result;
}

// ── Public API ──────────────────────────────────────────────────────────────

const cache = {};

/**
 * Fetches label and description for a URI from its RDF representation.
 * Results are cached; the same Promise is returned for repeated calls.
 *
 * @param {string} uri
 * @returns {Promise<{uri: string, label: string|null, description: string|null}>}
 */
export function fetchResource(uri) {
  if (!(uri in cache)) {
    cache[uri] = actualFetchResource(uri);
  }
  return cache[uri];
}
