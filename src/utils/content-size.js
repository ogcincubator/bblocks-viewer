// Above this many bytes, text content is truncated instead of displayed/highlighted in full
export const MAX_INLINE_TEXT_SIZE = 200 * 1024;

// Hard ceiling for lazily-fetched previews (e.g. transform outputs): the download itself is
// aborted past this point, so we never buffer/parse a huge body just to throw most of it away
export const MAX_FETCH_SIZE = 10 * 1024 * 1024;

// Separate, larger threshold for map/3D candidacy: rendering a Leaflet/Three.js scene has a
// different cost profile than hljs/CodeMirror highlighting, so it tolerates a bigger payload
export const MAX_VISUALIZATION_SIZE = 1024 * 1024;

// Returns true if a build-time reported size (in bytes) already exceeds the given threshold
export function isOversizedSize(sizeBytes, maxSize = MAX_INLINE_TEXT_SIZE) {
  return typeof sizeBytes === 'number' && sizeBytes > maxSize;
}

// All thresholds here are byte counts (to stay comparable with build-reported sizeBytes), so we
// measure actual UTF-8 byte length rather than JS string length (UTF-16 code units) — otherwise
// multi-byte text (e.g. CJK) could be up to ~3x the intended budget before truncation kicks in.
export function textByteLength(text) {
  return typeof text === 'string' ? new Blob([text]).size : 0;
}

// Truncates text to maxSize bytes, reporting whether truncation occurred
export function truncateText(text, maxSize = MAX_INLINE_TEXT_SIZE) {
  if (typeof text !== 'string' || textByteLength(text) <= maxSize) {
    return { text, truncated: false };
  }
  // Slicing by character count (not byte count) slightly overshoots the byte budget for
  // multi-byte text, but keeps this cheap and avoids splitting a surrogate pair mid-character.
  return { text: text.slice(0, maxSize), truncated: true };
}

// Declared sizeBytes lets us skip JSON.parse-ing/scanning a snippet we already know is too large,
// without having to touch (and thus fully materialize/scan) its content first. maxSize defaults
// to the text-display threshold, but map/3D candidacy passes a larger, rendering-specific one.
export function isSnippetOversized(snippet, maxSize = MAX_INLINE_TEXT_SIZE) {
  if (!snippet) {
    return false;
  }
  if (isOversizedSize(snippet.sizeBytes, maxSize)) {
    return true;
  }
  return textByteLength(snippet.code) > maxSize;
}