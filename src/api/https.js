import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2/',
  headers: {
    "Content-Type": "application/json"
  }
});

// request 攔截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response 攔截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);