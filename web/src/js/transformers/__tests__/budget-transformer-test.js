import { transformFromApi, transformToApi } from '../budget-transformer';

describe('BudgetTransformer', () => {
  describe('transformFromApi', () => {
    it('converts api response', () => {
      const apiBudget = {
        id: 1,
        account_id: 3,
        description: 'My income',
        day_of_month: 14,
        amount: 1000,
        credit: true,
      };

      expect(transformFromApi(apiBudget)).toEqual({
        id: 1,
        accountId: 3,
        description: 'My income',
        dayOfMonth: 14,
        amount: 1000,
        credit: true,
      });
    });
  });

  describe('transformToApi', () => {
    it('converts to api format', () => {
      const budget = {
        id: 1,
        accountId: 3,
        description: 'My income',
        dayOfMonth: 14,
        amount: 1000,
        credit: false,
      };

      expect(transformToApi(budget)).toEqual({
        id: 1,
        account_id: 3,
        description: 'My income',
        day_of_month: 14,
        amount: 1000,
        credit: false,
      });
    });
  });
});
