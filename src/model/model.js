/**
 * Truncates a body.
 *
 * @param {number} max number of words
 * @param {string} body the body to truncate
 * @return {string|*} the truncated body
 */
export function truncate(max, body) {
  const words = body.split(' ');
  return words.length >= max ? words.slice(0, max).join(' ') + ' ...' : body;
}
