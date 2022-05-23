import { $authHost, $host } from ".";


export const createRequest = async (data, userId) => {
  await $authHost.post(`api/appeals/user/${userId}`, data);
}

export const editRequest = async (data, userId, requestId) => {
  await $authHost.patch(`api/appeals/user/${userId}?appeal=${requestId}`, data);
}

export const deleteRequest = async (userId, requestId) => {
  await $authHost.delete(`api/appeals/user/${userId}?appeal=${requestId}`);
}

export const fetchPopularRequests = async (type, topic, district, find, page, count) => {
  const { data } = await $host.get(`api/appeals/popular?` + 
    (type && type != '' ? `type=${type}&` : '') +
    (topic && topic != '' ? `topic=${topic}&` : '') +
    (district && district != '' ? `district=${district}&` : '') +
    (page && page != '' ? `page=${page}&` : '') +
    (count && count != '' ? `count=${count}&` : '') +
    (find && find != '' ? `find=${find}` : ''))
  return data;
}

export const fetchRequests = async (type, topic, district, answered, find, page, count) => {
  const { data } = await $authHost.get(`api/appeals/admin?` + 
    (type && type != '' ? `type=${type}&` : '') +
    (topic && topic != '' ? `topic=${topic}&` : '') +
    (district && district != '' ? `district=${district}&` : '') +
    (answered && answered != '' ? `answered=${answered === "Рассмотренные" ? true : false}&` : '') +
    (page && page != '' ? `page=${page}&` : '') +
    (count && count != '' ? `count=${count}&` : '') +
    (find && find != '' ? `find=${find}` : ''))
  return data;
}

export const fetchUserRequests = async (userId, type, topic, district, answered, find, page, count) => {
  const { data } = await $authHost.get(`api/appeals/user/${userId}?` + 
  (type && type != '' ? `type=${type}&` : '') +
  (topic && topic != '' ? `topic=${topic}&` : '') +
  (district && district != '' ? `district=${district}&` : '') +
  (answered && answered != '' ? `answered=${answered === "Рассмотренные" ? true : false}&` : '') +
  (page && page != '' ? `page=${page}&` : '') +
  (count && count != '' ? `count=${count}&` : '') +
  (find && find != '' ? `find=${find}` : ''))
return data;
}

export const createAnswerToRequest = async (req, reqId) => {
  const {data} = await $authHost.patch(`api/appeals/admin/${reqId}`, req);
  return data;
}

export const getRequestById = async (reqId) => {
  const {data} = await $authHost.get(`api/appeals/admin/${reqId}`);
  return data;
}