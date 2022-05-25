import { $authHost, $host } from ".";


export const fetchAllVotings = async (page, count) => {
  const {data} = await $authHost.get(`api/votes?` +
  (count && count !== '' ? `count=${count}&` : '') +
  (page && page !== '' ? `page=${page}&` : '')
  );
  return data;
}

export const fetchVotingById = async (id) => {
  const {data} = await $authHost.get(`api/votes/${id}`);
  return data;
}

export const deleteVotingById = async (id) => {
  const {data} = await $authHost.delete(`api/votes/admin/${id}`);
  return data;
}

export const createVoting = async (votingData) => {
  const {data} = await $authHost.post(`api/votes/admin`, votingData);
  return data;
}