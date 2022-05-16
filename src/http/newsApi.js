import { $authHost, $host } from ".";


export const createNews = async () => {
  
  return data;
}

export const fetchNews = async () => {
  const {data} = await $host.get('api/news');
  return data;
}

export const fetchNewsWithPagination = async (count, page) => {
  const {data} = await $host.get(`api/news?count=${count}&page=${page}`);
  return data;
}

export const fetchOneNews = async (newsId) => {
  const {data} = await $host.get(`api/news/${newsId}`);
  return data;
}