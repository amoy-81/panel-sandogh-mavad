import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const httpService = axios.create({
  baseURL: BASE_URL,
});

export const Axios = axios.create({
  baseURL: BASE_URL,
  // timeout: 15000,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  }
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = token ? true : false;
  config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // add auth header with jwt if account is logged in and request is to the api url
      ...(isLoggedIn && {
          Authorization: `Bearer ${JSON.parse(token)}`
      })
  }
  return config
}, error => Promise.reject(error))

Axios.interceptors.response.use(undefined, (response) => {

  // if token expired
  if (response.response.status === 401) {
      alert("توکن شما منقضی شده، نیاز است تا مجددا وارد شوید!")
      localStorage.clear();
      window.location.href = '/auth/login';
  }

  return Promise.reject(response);
})

