import { $authHost, $host } from ".";


export const createHistory = async (history) => {
  const {data} = await $authHost.post('api/history', history);
  return data;
}

export const editHistory = async (editData) => {
  const {data} = await $authHost.patch('api/history', editData);
}

export const fetchHistory = async () => {
  const {data} = await $host.get('api/history');
  return data;
}

export const fetchHistoryWithPagination = async (count, page) => {
  const {data} = await $host.get(`api/history?count=${count}&page=${page}`);
  return data;
}

export const fetchOneHistory = async (historyId) => {
  const {data} = await $host.get(`api/history/${historyId}`);
  return data;
}