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

export function md2html(s) {
  return marked(s);
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
