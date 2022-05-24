import { $authHost, $host } from ".";


export const createRequest = async (data) => {
  await $authHost.post(`api/appeals/user`, data);
}

export const editRequest = async (data, requestId) => {
  await $authHost.patch(`api/appeals/user/?appeal=${requestId}`, data);
}

export const deleteRequest = async (requestId) => {
  await $authHost.delete(`api/appeals/user/?appeal=${requestId}`);
}

export const getUserRequestById = async (requestId) => {
  const {data} = await $authHost.get(`api/appeals/user/${requestId}`);
  return data;
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

export const fetchUserRequests = async (type, topic, district, answered, find, page, count) => {
  const { data } = await $authHost.get(`api/appeals/user/?` + 
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