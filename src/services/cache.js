const localStorageSeperator = '__TP2_WEB_CACHE__';
const cacheInterval = 2 * 60 * 1000;

export function store(key, value) {
  const finalValue = `${value}${localStorageSeperator}${Date.now().toString()}`;
  sessionStorage.setItem(key, finalValue);
}

export function isValid(key) {
  const value = sessionStorage.getItem(key);
  if (value === null) return {isValid: false};
  const values = value.split(localStorageSeperator);
  const timestamp = Number(values[1]);
  if (Number.isNaN(timestamp)) return {isValid: false};
  const date = new Date(timestamp);
  if (date.toString() === 'Invalid Date') return {isValid: false};
  if (Date.now() - date.getTime() < cacheInterval)
    return {isValid: true, value: values[0]};
}
