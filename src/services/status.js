/**
 * Returns true if the status is a client error.
 *
 * @param {number} status the status to verify
 * @return {boolean} true if the status is a client error
 */
export function isClientError(status) {
  return status >= 400 && status < 500;
}

/**
 * Returns true if the status is a server error.
 * @param {number} status the status to verify
 * @return {boolean} true if the status is a server error
 */
export function isServerError(status) {
  return status >= 500 && status < 600;
}
