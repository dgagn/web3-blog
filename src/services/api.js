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
  instance.interceptors.request.use(config => {
    const token = getAuthToken();
    config.headers.Authorization = token ? `Bearer ${token}` : undefined;
    return config;
  });
  instance.interceptors.request.use(request => requestHandler(request));
  instance.interceptors.response.use(
    response => responseHandler(response),
    err => errorHandler(err),
  );

  return instance;
}

function responseHandler(response) {
  console.log(response);
  if (
    response.config.method.toUpperCase() === 'GET' &&
    response.config.url &&
    !isURLInWhiteList(response.config.url)
  ) {
    console.log('storing in cache');
    cache.store(response.config.url, JSON.stringify(response.data));
  }
  return response;
}

function errorHandler(error) {
  console.log(error);
  console.log(error?.headers);
  console.log(error?.response);
  if (error.headers?.cached) {
    console.log('got cached data in response, serving it directly');
    return Promise.resolve(error);
  }
  return Promise.reject(error?.response);
}

function requestHandler(request) {
  console.log(request);
  if (request.method.toUpperCase() === 'GET') {
    const isValidResponse = cache.isValid(request.url || '');
    if (isValidResponse?.isValid) {
      console.log('serving cached data');
      request.headers.cached = true;
      request.data = JSON.parse(isValidResponse.value || '{}');
      return Promise.reject(request);
    }
  }
  return request;
}

export default axiosClient();
