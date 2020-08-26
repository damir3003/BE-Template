import { Profile } from "../model";
const { Op } = require("sequelize");

export const getByFields = (fields) =>
  Profile.findAll({
    where: {
      ...fields,
    },
    raw: true,
  });

export const updateUserBalance = async (id, balance) => {
  await Profile.update(
    { balance },
    {
      where: {
        id,
      },
    }
  );
};
