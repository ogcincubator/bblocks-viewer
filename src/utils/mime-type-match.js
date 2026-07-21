// Wildcard-aware MIME type matcher shared by view-plugin type matching (both a plugin class's
// `supportedTypes` and any future config-level `types` field use this one implementation).
function mimeTypeMatches(pattern, type) {
  if (!pattern || !type) return false;
  if (pattern === '*/*' || pattern === type) return true;
  const [pType, pSub] = pattern.split('/');
  const [tType, tSub] = type.split('/');
  return pType === tType && (pSub === '*' || pSub === tSub);
}

export { mimeTypeMatches };
