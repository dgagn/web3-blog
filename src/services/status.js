export function isClientError(status) {
  return status >= 400 && status < 500;
}

export function isServerError(status) {
  return status >= 500 && status < 600;
}
