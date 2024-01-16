import {marked} from "marked";

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

export function interceptLinks(e) {
  e.preventDefault();
  if (e.target?.href) {
    window.open(e.target.href);
  }
}

export function copyToClipboard(text) {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(text);
  }
}
