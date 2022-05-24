import { $authHost, $host } from ".";


export const fetchAllVotings = async () => {
  const {data} = await $host.get(`api/votes`);
  return data;
}

export const fetchVotingById = async (id) => {
  const {data} = await $host.get(`api/votes/${id}`);
  return data;
}

export const deleteVotingById = async (id) => {
  const {data} = await $authHost.delete(`api/votes/admin/${id}`);
  return
}

export const createVoting = async (votingData) => {
  const {data} = await $authHost.post(`api/votes/admin`, votingData);
}