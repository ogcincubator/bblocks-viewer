// `mimeType` is the canonical MIME type used for view-plugin type matching (see
// composables/view-plugins.js). Only set where the slug has one unambiguous canonical MIME type;
// left unset for slugs with no natural MIME equivalent (plaintext, or aliases split across several
// MIME types like xml/html which already have their own aliases below).
const knownLanguages = {
  'json': { id: 'json', order: 0, label: 'JSON', mimeType: 'application/json' },
  'yaml': { id: 'yaml', order: 1, label: 'YAML', mimeType: 'application/yaml' },
  'jsonld': { id: 'jsonld', order: 3, label: 'JSON-LD', highlight: 'json', mimeType: 'application/ld+json' },
  'turtle': { id: 'turtle', order: 4, label: 'RDF/Turtle', mimeType: 'text/turtle' },
  'plaintext': { id: 'plaintext', order: 5, label: 'Plain text' },
  'java': { id: 'java', order: 6, label: 'Java', mimeType: 'text/x-java' },
  'python': { id: 'python', order: 7, label: 'Python', mimeType: 'application/x-python' },
  'javascript': { id: 'javascript', order: 8, label: 'Javascript', mimeType: 'application/javascript' },
  'bash': { id: 'bash', order: 9, label: 'Bash', mimeType: 'application/x-sh' },
  'geojson': { id: 'geojson', order: 2, label: 'GeoJSON', highlight: 'json', mimeType: 'application/geo+json' },
  'xml': { id: 'xml', order: 10, label: 'XML', mimeType: 'application/xml' },
  'html': { id: 'html', order: 11, label: 'HTML', highlight: 'xml', mimeType: 'text/html' },
  'css': { id: 'css', order: 12, label: 'CSS', mimeType: 'text/css' },
  'typescript': { id: 'typescript', order: 13, label: 'TypeScript', mimeType: 'application/typescript' },
  'sql': { id: 'sql', order: 14, label: 'SQL', mimeType: 'application/sql' },
  'sparql': { id: 'sparql', order: 15, label: 'SPARQL', mimeType: 'application/sparql-query' },
  'jq': { id: 'jq', order: 16, label: 'jq' },
  'markdown': { id: 'markdown', order: 17, label: 'Markdown', mimeType: 'text/markdown' },
  'graphql': { id: 'graphql', order: 18, label: 'GraphQL', mimeType: 'application/graphql' },
  'ruby': { id: 'ruby', order: 19, label: 'Ruby', mimeType: 'text/x-ruby' },
  'go': { id: 'go', order: 20, label: 'Go', mimeType: 'text/x-go' },
  'rust': { id: 'rust', order: 21, label: 'Rust', mimeType: 'text/x-rust' },
  'cpp': { id: 'cpp', order: 22, label: 'C++', mimeType: 'text/x-c++src' },
  'c': { id: 'c', order: 23, label: 'C', mimeType: 'text/x-csrc' },
  'kotlin': { id: 'kotlin', order: 24, label: 'Kotlin', mimeType: 'text/x-kotlin' },
  'swift': { id: 'swift', order: 25, label: 'Swift', mimeType: 'text/x-swift' },
  'scala': { id: 'scala', order: 26, label: 'Scala', mimeType: 'text/x-scala' },
  'r': { id: 'r', order: 27, label: 'R', mimeType: 'text/x-r' },
  'lua': { id: 'lua', order: 28, label: 'Lua', mimeType: 'text/x-lua' },
  'perl': { id: 'perl', order: 29, label: 'Perl', mimeType: 'text/x-perl' },
  'php': { id: 'php', order: 30, label: 'PHP', mimeType: 'application/x-httpd-php' },
  'wasm': { id: 'wasm', order: 31, label: 'WebAssembly', mimeType: 'application/wasm' },
  'xquery': { id: 'xquery', order: 32, label: 'XQuery', mimeType: 'application/xquery' },
  'latex': { id: 'latex', order: 33, label: 'LaTeX', mimeType: 'application/x-latex' },
  'protobuf': { id: 'protobuf', order: 34, label: 'Protocol Buffers', mimeType: 'application/protobuf' },

  // file extension aliases
  'ttl': 'turtle',
  'json-ld': 'jsonld',
  'yml': 'yaml',
  'txt': 'plaintext',
  'js': 'javascript',
  'ts': 'typescript',
  'md': 'markdown',
  'rb': 'ruby',
  'rs': 'rust',
  'kt': 'kotlin',
  'rdf/turtle': 'turtle',
  'htm': 'html',
  'pgsql': 'sql',
  'postgres': 'sql',

  // MIME type aliases
  'application/json': 'json',
  'application/geo+json': 'geojson',
  'application/yaml': 'yaml',
  'application/xml': 'xml',
  'application/javascript': 'javascript',
  'application/typescript': 'typescript',
  'application/sql': 'sql',
  'application/sparql-query': 'sparql',
  'application/sparql-update': 'sparql',
  'application/graphql': 'graphql',
  'application/wasm': 'wasm',
  'application/xquery': 'xquery',
  'application/x-latex': 'latex',
  'application/protobuf': 'protobuf',
  'application/x-python': 'python',
  'application/x-httpd-php': 'php',
  'text/xml': 'xml',
  'text/html': 'html',
  'text/css': 'css',
  'text/javascript': 'javascript',
  'text/typescript': 'typescript',
  'text/markdown': 'markdown',
  'text/x-sql': 'sql',
  'text/x-python': 'python',
  'text/x-ruby': 'ruby',
  'text/x-go': 'go',
  'text/x-rust': 'rust',
  'text/x-c++src': 'cpp',
  'text/x-csrc': 'c',
  'text/x-java': 'java',
  'text/x-java-source': 'java',
  'text/x-kotlin': 'kotlin',
  'text/x-swift': 'swift',
  'text/x-scala': 'scala',
  'text/x-r': 'r',
  'text/x-lua': 'lua',
  'text/x-perl': 'perl',
  'text/x-php': 'php',
  'text/x-latex': 'latex',
  'text/turtle': 'turtle',
  'shell': 'bash',
  'sh': 'bash',
};

const binaryApplicationTypes = new Set([
  'application/octet-stream',
  'application/pdf',
  'application/zip',
  'application/gzip',
  'application/x-tar',
  'application/x-bz2',
  'application/x-7z-compressed',
  'application/x-rar-compressed',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

// Returns true if the text content appears to be binary data
function isLikelyBinary(text) {
  if (!text) return false;
  const sample = text.slice(0, 8192);
  let nonPrintable = 0;
  for (let i = 0; i < sample.length; i++) {
    const code = sample.charCodeAt(i);
    if (code === 0) return true; // null byte = definitely binary
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) nonPrintable++;
  }
  return nonPrintable / sample.length > 0.05;
}

// Returns 'code' | 'image' | 'video' | 'audio' | 'download'
function classifyMimeType(mimeType) {
  if (!mimeType) return 'code';
  let lang = knownLanguages[mimeType];
  if (typeof lang === 'string') lang = knownLanguages[lang];
  if (lang) return 'code';
  if (mimeType.startsWith('text/')) return 'code';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (binaryApplicationTypes.has(mimeType)) return 'download';
  return 'download';
}

const getHighlightLanguage = lang => {
  let l = knownLanguages[lang];
  if (typeof l === 'string') {
    l = knownLanguages[l];
  }
  if (l) {
    return l.highlight || l.id;
  }
  return lang;
};

const geoJsonLanguageIds = new Set(['json', 'jsonld', 'geojson']);

export {
  knownLanguages,
  getHighlightLanguage,
  geoJsonLanguageIds,
  classifyMimeType,
  isLikelyBinary,
};
