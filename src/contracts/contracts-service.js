import {
  getAllForUser,
  getByIdForUser,
  getByFileds,
} from './contracts-repository';

export const getActiveContracsForUser = (profile) => getAllForUser(profile);

export const getContractByIdForUser = (id, profile) =>
  getByIdForUser(id, profile);

export const getContractForJobs = (jobs) =>
  getByFileds({ id: jobs.map((item) => item.ContractId) });

export const getActiveContractIdsForUser = async (profile) =>
  ((await getActiveContracsForUser(profile)) || []).map((item) => item.id);
