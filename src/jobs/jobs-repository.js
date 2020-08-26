import { Job } from "../model";
const { Op } = require("sequelize");

export const getUnpaidJobsForContracts = (contracts = []) =>
  Job.findAll({
    where: {
      paid: { [Op.not]: true },
      ContractID: contracts,
    },
    raw: true,
  });

export const getAllForDateRange = (startDate, endDate) =>
  Job.findAll({
    where: {
      paid: true,
      paymentDate: { [Op.between]: [startDate, endDate] },
    },
    raw: true,
  });

export const getById = (id) =>
  Job.findOne({
    where: { id },
    raw: true,
  });

export const update = async (id, fields) => {
  await Profile.update(
    { ...fields },
    {
      where: {
        id,
      },
    }
  );
};
