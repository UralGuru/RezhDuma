import { $authHost, $host } from ".";


export const createRequest = async (data, userId) => {
  await $authHost.post(`api/appeals/user/${userId}`, data);
}

export const fetchPopularRequests = async () => {
  const {data} = await $host.get('api/appeals/popular');
  return data;
}

export const fetchAllRequests = async (type, topic, district) => {
  const {data} = await $authHost.get(`api/appeals/admin?` + 
    (type != '' ? `type=${type}&` : '') +
    (topic != '' ? `topic=${topic}&` : '') +
    (district != '' ? `district=${district}` : ''))
  return data;
}

export const createAnswerToRequest = async (req, reqId) => {
  const {data} = await $authHost.patch(`api/appeals/admin/${reqId}`, req);
  return data;
}