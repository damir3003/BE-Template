import { getAllForDateRange } from '../jobs/jobs-repository';
import { getContractForJobs } from '../contracts/contracts-service';
import { getClientsForContracts } from '../users/user-service';

export const getBestProfession = async (start, end, limit) => {
  const jobs = (await getAllForDateRange(start, end)) || [];
  const contracts = (await getContractForJobs(jobs)) || [];
  const clients = await getClientsForContracts(contracts);

  const prifisientsMap = clients.reduce((res, value) => {
    res[value.id] = { key: value.profession, value: value.profession };
    return res;
  }, {});
  return calculateRevenueByProffessions(jobs, contracts, prifisientsMap)
    .sort((a, b) => +b.revenue - +a.revenue)
    .slice(0, limit);
};

export const getBestPayedClient = async (start, end, limit) => {
  const jobs = (await getAllForDateRange(start, end)) || [];
  const contracts = (await getContractForJobs(jobs)) || [];
  const clients = await getClientsForContracts(contracts);

  const prifisientsMap = clients.reduce((res, value) => {
    res[value.id] = { key: value.id, value };
    return res;
  }, {});
  return calculateRevenueByProffessions(jobs, contracts, prifisientsMap)
    .sort((a, b) => +b.revenue - +a.revenue)
    .slice(0, limit);
};

const calculateRevenueByProffessions = (jobs, contracts, prifisientsMap) => {
  const contractsMap = contracts.reduce((res, value) => {
    res[value.id] = value.ClientId;
    return res;
  }, {});

  const revenueByProfession = jobs.reduce((res, value) => {
    const proffesion = prifisientsMap[contractsMap[value.ContractId]];
    if (!res[proffesion.key]) {
      res[proffesion.key] = { value: proffesion.value, revenue: 0 };
    }
    res[proffesion.key] = {
      value: proffesion.value,
      revenue: res[proffesion.key].revenue + value.price,
    };
    return res;
  }, {});

  return Object.values(revenueByProfession);
};
