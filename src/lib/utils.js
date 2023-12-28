export function debounce(handler, timeout) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const _this = this;
    timer = setTimeout(() => {
      handler.apply(_this, args);
    }, timeout);
  };
}
