import { getActiveContractIdsForUser } from '../contracts/contracts-service';
import {
  getUnpaidJobsForContracts,
  getById,
  getAllForDateRange,
  update
} from './jobs-repository';
import { getContractByIdForUser } from '../contracts/contracts-service';
import { updateBalance, getUserById } from '../users/user-service';

export const getAllUnpaidJobsForUser = async (profile) => {
  const activeContracts = await getActiveContractIdsForUser(profile);
  return getUnpaidJobsForContracts(activeContracts);
};

export const getAllPaidJobs = async (startDate, endDate, limit) =>
  getAllForDateRange(startDate, endDate);

export const payJob = async (id, profile) => {
  const job = await getById(id);
  if (job.paid) {
    throw Error('Job has already paid');
  }
  const contract = await getContractByIdForUser(job.ContractId, profile);
  if (!contract) {
    throw Error('There is no contract for this job');
  }
  if (job.price > profile.balance) {
    throw Error('Insufficient funds');
  }
  await updateBalance(profile.id, profile.balance - job.price);
  const contractor = await getUserById();
  await updateBalance(contract.ContractorId, contractor.price + -job.price);
  await update(job.id, {
    "paid": true,
    "paymentDate": new Date(),
  })
  return true;
};
