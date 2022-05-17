import { $authHost, $host } from ".";


export const createRequest = async (data, userId) => {
  const dat = $authHost.post(`api/appeals/user/${userId}`, data);
  return dat;
}

export const fetchPopularRequests = async () => {
  const {data} = await $host.get('api/appeals/popular');
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