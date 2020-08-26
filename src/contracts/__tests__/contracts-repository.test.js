import { Contract } from '../../model';
import { Op } from 'sequelize';

import {
  getByIdForUser,
  getByFileds,
  getAllForUser,
} from '../contracts-repository';

jest.mock('../../model');

describe('contracts-repository', () => {
  it('getByIdForUser should call modelFunction with proper params', () => {
    const CONTRACT_ID = '2';
    const user = { id: 3 };
    getByIdForUser(CONTRACT_ID, user);
    expect(Contract.findOne).toHaveBeenCalledWith({
      where: {
        id: CONTRACT_ID,
        [Op.or]: [{ ClientId: user.id }, { ContractorId: user.id }],
      },
      raw: true,
    });
  });

  it("getByFileds should call modelFunction with proper params", () => {
    const fields = { id: 3, customField: 3 };
    getByFileds(fields);
    expect(Contract.findAll).toHaveBeenCalledWith({
      where: {
        id: 3,
        customField: 3,
      },
      raw: true,
    });
  });

  it('getByFileds should call modelFunction with proper params', () => {
    const user = { id: 3 };
    getAllForUser(user);
    expect(Contract.findAll).toHaveBeenCalledWith({
      where: {
        [Op.and]: [
          { status: { [Op.not]: 'terminated' } },
          { [Op.or]: [{ ClientId: user.id }, { ContractorId: user.id }] },
        ],
      },
      raw: true,
    });
  });
});
