export function throttle(callback, limit = 100) {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

export function debounce(callback, limit = 1000) {
  let timeout;

  return function (e) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.call(this, e);
    }, limit);
  };
}
// 앞에 있는 타이머가 실행되기 전에 지워버리고 마지막 타이머만 실행됨
