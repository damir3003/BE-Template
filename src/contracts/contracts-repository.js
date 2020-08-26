import { Contract } from "../model";
const { Op } = require("sequelize");

export const getByIdForUser = (id, { id: userId }) =>
  Contract.findOne({
    where: {
      id,
      [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
    },
    raw: true,
  });

export const getByFileds = (fields) =>
  Contract.findAll({
    where: {
      ...fields,
    },
    raw: true,
  });

export const getAllForUser = ({ id: userId }) =>
  Contract.findAll({
    where: {
      [Op.and]: [
        { status: { [Op.not]: 'terminated' } },
        { [Op.or]: [{ ClientId: userId }, { ContractorId: userId }] },
      ],
    },
    raw: true,
  });
