import axios from 'axios';
import {getAuthToken} from './auth';

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
  instance.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      return Promise.reject(err?.response);
    },
  );

  return instance;
}

export default axiosClient();
