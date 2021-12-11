import axios from 'axios';
import {getAuthToken} from './auth';
import * as cache from './cache';

const whiteList = ['user', 'logout'];

function isURLInWhiteList(url) {
  return whiteList.includes(url);
}

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

function authHandler(request) {
  const token = getAuthToken();
  request.headers.Authorization = token ? `Bearer ${token}` : undefined;
  return request;
}

function responseHandler(response) {
  if (
    response.config.method.toUpperCase() === 'GET' &&
    response.config.url &&
    !isURLInWhiteList(response.config.url)
  )
    cache.store(response.config.url, JSON.stringify(response.data));
  return response;
}

function errorHandler(error) {
  if (error.headers?.cached) {
    return Promise.resolve(error);
  }
  return Promise.reject(error?.response);
}

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
