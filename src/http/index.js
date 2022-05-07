import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

$authHost.interceptors.request.use((config) => {
  config.headers.authorization = `Rejh ${localStorage.getItem('token')}`
  return config;
})

$authHost.interceptors.response.use((config) => {
  return config;
  }, (async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/token/refresh`);
        localStorage.setItem('token', response.data.access_token)
        return $authHost.request(originalRequest)
      } catch (e) {
        console.log('Не авторизован');
      }
    }
    throw error;
  }))


export {
  $host,
  $authHost
}