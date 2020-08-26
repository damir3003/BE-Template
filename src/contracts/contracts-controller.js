import {
  getContractByIdForUser,
  getActiveContracsForUser,
} from './contracts-service';

export const show = async (req, res) => {
  const { id } = req.params;
  const { profile } = req;
  const contract = await getContractByIdForUser(id, profile);
  if (!contract) return res.status(404).end();
  res.json(contract);
};
export const index = async (req, res) => {
  const { profile } = req;
  const contracts = await getActiveContracsForUser(profile);
  if (!contracts) return res.status(404).end();
  res.json(contracts);
};
