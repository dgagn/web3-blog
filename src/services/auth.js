import axiosClient from './api';

const localAuthKey = '__tp2_auth_key__';

export function getAuthToken() {
  return window.localStorage.getItem(localAuthKey);
}

export async function getUser() {
  const token = getAuthToken();
  if (!token) return;
  return (await axiosClient.get('user')).data;
}

function setAuthKey({data}) {
  if (data?.access_token) {
    window.localStorage.setItem(localAuthKey, data.access_token);
  }
  return data;
}

function removeAuthKey({data}) {
  window.localStorage.removeItem(localAuthKey);
  return data;
}

export function login(credentials) {
  return axiosClient.post('login', credentials).then(setAuthKey).then(getUser);
}

export function register(credentials) {
  return axiosClient.post('register', credentials).then(setAuthKey);
}

export function logout() {
  return axiosClient.get('logout').then(removeAuthKey);
}
