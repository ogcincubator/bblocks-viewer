const knownLanguages = {
  'json': { id: 'json', order: 0, label: 'JSON' },
  'yaml': { id: 'yaml', order: 1, label: 'YAML' },
  'jsonld': { id: 'jsonld', order: 3, label: 'JSON-LD', highlight: 'json' },
  'turtle': { id: 'turtle', order: 4, label: 'RDF/Turtle' },
  'plaintext': { id: 'plaintext', order: 5, label: 'Plain text' },
  'java': { id: 'java', order: 6, label: 'Java' },
  'python': { id: 'python', order: 7, label: 'Python' },
  'javascript': { id: 'javascript', order: 8, label: 'Javascript' },
  'bash': {id: 'bash', order: 9, label: 'Bash'},

  'ttl': 'turtle',
  'json-ld': 'jsonld',
  'yml': 'yaml',
  'txt': 'plaintext',
  'js': 'javascript',
  'rdf/turtle': 'turtle',
  'application/json': 'json',
  'application/yaml': 'yaml',
  'shell': 'bash',
  'sh': 'bash',
};

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

export { knownLanguages, getHighlightLanguage };
