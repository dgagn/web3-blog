const storageCacheName = '__TP2_WEB_CACHE__';
const cacheInterval = 2 * 60 * 1000;

/**
 * Store the key in the session storage.
 *
 * @param {*} key the key to store
 * @param {*} value the value to store
 */
export function store(key, value) {
  const finalValue = `${value}${storageCacheName}${Date.now().toString()}`;
  sessionStorage.setItem(key, finalValue);
}

/**
 * Returns true if it is valid with the value
 * @param {*} key the key
 * @return {{isValid: boolean, value: string}|{isValid: boolean}} true if it is
 * valid with the value
 */
export function isValid(key) {
  const value = sessionStorage.getItem(key);
  if (value === null) return {isValid: false};
  const values = value.split(storageCacheName);
  const timestamp = Number(values[1]);
  if (Number.isNaN(timestamp)) return {isValid: false};
  const date = new Date(timestamp);
  if (date.toString() === 'Invalid Date') return {isValid: false};
  if (Date.now() - date.getTime() < cacheInterval)
    return {isValid: true, value: values[0]};
}
