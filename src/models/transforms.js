const codeLanguageMap = {
  xslt: 'xml',
  'sparql-update': 'sparql',
};

export function getCodeLanguage(type) {
  return codeLanguageMap[type] ?? type;
}

export function getTypeColor(text) {
  switch (text) {
    case 'jq':
      return '#000033';
    case 'sparql-update':
      return '#990000';
    case 'xslt':
      return '#006600';
  }
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const r = Math.abs(hash) % 180;
  const g = Math.abs(hash >> 8) % 180;
  const b = Math.abs(hash >> 16) % 180;
  const toHex = (num) => num.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
