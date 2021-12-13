import axiosClient from './api';

const localAuthKey = '__tp2_auth_key__';

/**
 * Gets the auth token from localstorage.
 *
 * (Can be sessionStorage) for security but, usually it is safe
 * to store a token in the local storage when auth is done correctly.
 *
 * @return {string} the auth token
 */
export function getAuthToken() {
  return window.localStorage.getItem(localAuthKey);
}

/**
 * Gets the authentified user.
 *
 * @return {Promise<any>} the authentified user
 */
export async function getUser() {
  const token = getAuthToken();
  if (!token) return;
  return (await axiosClient.get('user')).data;
}

/**
 * Sets the auth key
 * @param {*} data the data of the response
 * @return {{access_token}|*} the data
 */
function setAuthKey({data}) {
  if (data?.access_token) {
    window.localStorage.setItem(localAuthKey, data.access_token);
  }
  return data;
}

/**
 * Remove the auth key from the storage.
 *
 * @param {*} data the data from response
 * @return {*} the data
 */
function removeAuthKey({data}) {
  window.localStorage.removeItem(localAuthKey);
  return data;
}

/**
 * The login functionnality.
 *
 * @param {*} credentials the credentials to login
 * @return {Promise<AxiosResponse<any>>} the response of the request
 */
export function login(credentials) {
  return axiosClient.post('login', credentials).then(setAuthKey).then(getUser);
}

/**
 * The register functionnality.
 *
 * @param {*} credentials the credentials to login
 * @return {Promise<AxiosResponse<any>>} the response of the request
 */
export function register(credentials) {
  return axiosClient.post('register', credentials);
}

/**
 * The logout functionnality.
 *
 * @return {Promise<AxiosResponse<any>>} the response of the request
 */
export function logout() {
  return axiosClient.get('logout').then(removeAuthKey);
}
