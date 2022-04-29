import { $host } from ".";


export const createNews = async () => {
  return;
}

export const fetchNews = async () => {
  const {data} = await $host.get('api/news');
  return data;
}