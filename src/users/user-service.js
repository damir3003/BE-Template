import { updateUserBalance, getByFields } from "./user-repository";

export const updateBalance = async (id, balance) =>
  updateUserBalance(id, balance);

export const getUserById = async (ids) => getByFields({ id: ids });

export const getClientsForContracts = async (contracts) => {
  const clients =
    (await getByFields({ id: contracts.map((item) => item.ClientId) })) || [];
  return Array.isArray(clients) ? clients : [clients];
};
