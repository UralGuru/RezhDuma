import { $authHost, $host } from ".";


export const createRequest = async (data, userId) => {
  await $authHost.post(`api/appeals/user/${userId}`, data);
  return;
}

export const fetchPopularRequests = async () => {
  const {data} = await $host.get('api/appeals/popular');
  return data;
}