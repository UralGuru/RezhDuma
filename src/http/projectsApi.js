import { $authHost, $host } from ".";


export const createProjects = async (projects) => {
  const {data} = await $authHost.post('api/projects', projects);
  return data;
}

export const editProjects = async (editData) => {
  const {data} = await $authHost.patch('api/projects', editData);
}

export const fetchProjects = async (count, page, find) => {
  const {data} = await $host.get(`api/projects?` +
    (count && count !== '' ? `count=${count}&` : '') +
    (page && page !== '' ? `page=${page}&` : '') +
    (find && find !== '' ? `find=${find}&` : '')
  );
  return data;
}

export const fetchOneProject = async (projectsId) => {
  const {data} = await $host.get(`api/projects/${projectsId}`);
  return data;
}