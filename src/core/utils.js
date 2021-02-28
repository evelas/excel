// Pure Functuion
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, index) => {
    return start + index;
  });
}

// get set
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    // не deep equal
    // это будет работать если у нас не сложная стуртура данных
    // например нету в объекте new Data()
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
