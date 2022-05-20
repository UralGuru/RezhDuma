import { $authHost, $host } from ".";


export const createNews = async (news) => {
  const {data} = await $authHost.post('api/news', news);
  return data;
}

export const editNews = async (editData) => {
  const {data} = await $authHost.patch('api/news', editData);
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