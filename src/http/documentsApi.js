import { $authHost, $host } from ".";


export const createDocuments = async (documents) => {
  const {data} = await $authHost.post('api/documents', documents);
  return data;
}

export const editDocuments = async (editData) => {
  const {data} = await $authHost.patch('api/documents', editData);
}

export const fetchDocuments = async () => {
  const {data} = await $host.get('api/documents');
  return data;
}

export const fetchDocumentsWithPagination = async (count, page) => {
  const {data} = await $host.get(`api/documents?count=${count}&page=${page}`);
  return data;
}

export const fetchOneDocuments = async (documents) => {
  const {data} = await $host.get(`api/documents/${documents}`);
  return data;
}