import axios from "axios";
import { checkAuth } from "./userApi";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

$authHost.interceptors.request.use((config) => {
  config.headers.Authorization = `Rezh ${localStorage.getItem('access-token')}`
  return config;
})

$authHost.interceptors.response.use((config) => {
  return config;
  }, (async (error) => {
    const originalRequest = error.config;
    console.log(error.response);
    if (error.response.status == 403 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await checkAuth();
        console.log(response);
        localStorage.setItem('access-token', response.data[0].access_token)
        return $authHost.request(originalRequest)
      } catch (e) {
        console.log('Пользователь не авторизован');
      }
    }
    throw error;
  }))


export {
  $host,
  $authHost
}