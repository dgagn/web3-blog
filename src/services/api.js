import axios from 'axios';
import {getAuthToken} from './auth';
import * as cache from './cache';

const whiteList = ['user', 'logout'];

/**
 * Returns true if the url is in the whitelist.
 *
 * @param {string} url the url
 * @return {boolean} true if the url is in the whitelist
 */
function isURLInWhiteList(url) {
  return whiteList.includes(url);
}

/**
 * Returns the axios instance.
 *
 * @return {AxiosInstance} the axios instance
 */
function axiosClient() {
  const instance = axios.create({
    baseURL: 'http://10.80.8.30:8080/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(request => authHandler(request));
  instance.interceptors.request.use(request => requestHandler(request));
  instance.interceptors.response.use(
    response => responseHandler(response),
    err => errorHandler(err),
  );

  return instance;
}

/**
 * Returns the request with the token.
 *
 * @param {*} request
 * @return {*} thr request with the token
 */
function authHandler(request) {
  const token = getAuthToken();
  request.headers.Authorization = token ? `Bearer ${token}` : undefined;
  return request;
}

/**
 * Returns the cached response or the new response.
 *
 * @param {*} response the response
 * @return {*} the cached response or the new response
 */
function responseHandler(response) {
  if (
    response.config.method.toUpperCase() === 'GET' &&
    response.config.url &&
    !isURLInWhiteList(response.config.url)
  )
    cache.store(response.config.url, JSON.stringify(response.data));
  return response;
}

/**
 * Resolve it if a cached header is present.
 *
 * @param {*} error the error
 * @return {Promise<never>|Promise<unknown>} the promise
 */
function errorHandler(error) {
  if (error.headers?.cached) {
    return Promise.resolve(error);
  }
  return Promise.reject(error?.response);
}

/**
 * Handle the request for caching.
 *
 * @param {*} request the request
 * @return {Promise<never>|{url}|*} the promise
 */
function requestHandler(request) {
  if (request.method.toUpperCase() === 'GET') {
    const isValidResponse = cache.isValid(request.url || '');
    if (isValidResponse?.isValid) {
      request.headers.cached = true;
      request.data = JSON.parse(isValidResponse.value || '{}');
      return Promise.reject(request);
    }
  }
  return request;
}

export default axiosClient();
