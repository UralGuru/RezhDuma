import { $authHost, $host } from ".";
import axios from "axios";


export const createNews = async (news) => {
  const {data} = await $authHost.post('api/news', news);
  return data;
}

export const editNews = async (editData, id) => {
  const {data} = await $authHost.patch(`api/news/${id}`, editData);
  return data;
}

export const deleteNews = async (id) => {
  const {data} = await $authHost.delete(`api/news/${id}`)
  return data;
}

export const fetchNews = async (count, page, find) => {
  const {data} = await $host.get(`api/news?` +
    (count && count !== '' ? `count=${count}&` : '') +
    (page && page !== '' ? `page=${page}&` : '') +
    (find && find !== '' ? `find=${find}&` : '')
  );

  return data;
}

export const fetchOneNews = async (newsId) => {
  const {data} = await $host.get(`api/news/${newsId}`);
  return data;
}