import { fromJS } from 'immutable';
import * as budgetActions from '../budget-actions';
import * as budgetTransformer from '../../transformers/budget-transformer';
import store from '../../stores/store';
import apiUtil from '../../util/api-util';

describe('BudgetActions', () => {
  beforeEach(() => {
    spyOn(store, 'dispatch');
  });

  describe('fetchBudgets', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'get').and.returnValue(Promise.resolve());
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ currentAccount: { id: 12 } }) });
      budgetActions.fetchBudgets();
    });

    it('makes an ajax request to GET patterns', () => {
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: budgetActions.GET_BUDGETS });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts/12/budgets');
    });

    it('stores the budgets on success', () => {
      spyOn(budgetTransformer, 'transformFromApi').and.returnValue('transformedBudget');

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      getArgs.onSuccess({ budgets: ['budget'] });

      expect(budgetTransformer.transformFromApi).toHaveBeenCalledWith('budget');
      expect(store.dispatch).toHaveBeenCalledWith({
        type: budgetActions.SET_BUDGETS,
        budgets: ['transformedBudget'],
      });
    });
  });
});
