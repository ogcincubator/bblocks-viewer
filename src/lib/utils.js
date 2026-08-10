import {marked} from "marked";

const BBLOCKS_URI_PREFIX = 'bblocks://';

export function isBBlocksUri(s) {
  return typeof s === 'string' && s.startsWith(BBLOCKS_URI_PREFIX);
}

/**
 * Building block identifier for a `bblocks://` URI. Bare identifiers are returned
 * unchanged, so this is safe on values that may or may not carry the prefix (register.json
 * has used both spellings over time).
 */
export function bblockIdFromUri(s) {
  return isBBlocksUri(s) ? s.slice(BBLOCKS_URI_PREFIX.length) : s;
}

export function debounce(handler, timeout) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const _this = this;
    timer = setTimeout(() => {
      handler.apply(_this, args);
    }, timeout);
  };
}

export function md2html(s, base_url = null) {
  let html = marked(s);

  if (base_url) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    html = setBaseUrl(doc, base_url).body.innerHTML;
  }

  return html;
}

export function setBaseUrl(doc, base_url) {
  if (base_url) {
    if (!base_url.endsWith('/')) {
      base_url += '/';
    }
    doc.querySelectorAll('[src],[href]').forEach(elem => {
      for (let attr of ['src', 'href']) {
        if (elem[attr]) {
          try {
            const old = elem.getAttribute(attr);
            const url = new URL(old, base_url);
            elem.setAttribute(attr, url.toString());
          } catch {
            // ignore
          }
        }
      }
    });
  }
  return doc;
}

export function copyToClipboard(text) {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(text);
  }
}


export function outsidePromise() {
  const p = {
    resolve: null,
    reject: null,
  };
  p.promise = new Promise((resolve, reject) => Object.assign(p, { resolve, reject }));
  return p;
}
