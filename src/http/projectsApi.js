import { $authHost, $host } from ".";


export const createProjects = async (projects) => {
  const {data} = await $authHost.post('api/projects', projects);
  return data;
}

export const editProjects = async (editData) => {
  const {data} = await $authHost.patch('api/projects', editData);
}

export const fetchProjects = async () => {
  const {data} = await $host.get('api/projects');
  return data;
}

export const fetchProjectsWithPagination = async (count, page) => {
  const {data} = await $host.get(`api/projects?count=${count}&page=${page}`);
  return data;
}

export const fetchOneProject = async (projectsId) => {
  const {data} = await $host.get(`api/projects/${projectsId}`);
  return data;
}