import { $authHost, $host } from ".";


export const createHistory = async (history) => {
  const {data} = await $authHost.post('api/history', history);
  return data;
}

export const editHistory = async (editData, id) => {
  const {data} = await $authHost.patch(`api/history/${id}`, editData);
  return data;
}

export const deleteHistory = async (id) => {
  const {data} = await $authHost.delete(`api/history/${id}`)
  return data;
}

export const fetchHistory = async (count, page, find) => {
  const {data} = await $host.get(`api/history?` +
    (count && count !== '' ? `count=${count}&` : '') +
    (page && page !== '' ? `page=${page}&` : '') +
    (find && find !== '' ? `find=${find}` : '')
  );
  return data;
}

export const fetchOneHistory = async (historyId) => {
  const {data} = await $host.get(`api/history/${historyId}`);
  return data;
}