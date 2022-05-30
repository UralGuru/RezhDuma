import { $authHost, $host } from ".";


export const createProject = async (projects) => {
  const {data} = await $authHost.post('api/projects', projects);
  return data;
}

export const editProject = async (editData, id) => {
  const {data} = await $authHost.patch(`api/projects/${id}`, editData);
  return data;
}

export const deleteProject = async (id) => {
  const {data} = await $authHost.delete(`api/projects/${id}`)
  return data;
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