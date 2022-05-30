import { $authHost, $host } from ".";


export const createDocuments = async (documents) => {
  const {data} = await $authHost.post('api/documents', documents);
  return data;
}

export const editDocuments = async (editData, id) => {
  const {data} = await $authHost.patch(`api/documents/${id}`, editData);
  return data;
}

export const deleteDocument = async (id) => {
  const {data} = await $authHost.delete(`api/documents/${id}`)
  return data;
}

export const fetchDocuments = async (count, page, find) => {
  const {data} = await $host.get(`api/documents?` +
    (count && count !== '' ? `count=${count}&` : '') +
    (page && page !== '' ? `page=${page}&` : '') +
    (find && find !== '' ? `find=${find}` : '')
  );
  return data;
}

export const fetchOneDocuments = async (documents) => {
  const {data} = await $host.get(`api/documents/${documents}`);
  return data;
}