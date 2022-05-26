import { $authHost, $host } from ".";

export const getUserData = async () => {
  const {data} = await $authHost.get(`api/users/profile`);
  return data;
}

export const editUserData = async (editData) => {
  const {data} = await $authHost.put(`api/users/edit/profile`, editData);
  return data;
}

export const changeUserPassword = async (editData) => {
  const {data} = await $authHost.patch(`api/users/edit/password`, editData)
  return data;
}