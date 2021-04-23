import { fromJS } from 'immutable';
import * as budgetActions from 'actions/budget-actions';
import {
  GET_BUDGETS,
  SET_BUDGETS,
  SAVE_BUDGET,
  DELETE_BUDGET,
} from 'actions/action-types';
import * as budgetTransformer from 'transformers/budget-transformer';
import store from 'stores/store';
import apiUtil from 'util/api-util';

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
      expect(store.dispatch).toHaveBeenCalledWith({ type: GET_BUDGETS });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts/12/budgets');
    });

    it('stores the budgets on success', () => {
      spyOn(budgetTransformer, 'transformFromApi').and.returnValue('transformedBudget');

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      getArgs.onSuccess({ budgets: ['budget'] });

      expect(budgetTransformer.transformFromApi).toHaveBeenCalledWith('budget');
      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_BUDGETS,
        budgets: ['transformedBudget'],
      });
    });
  });

  describe('saveBudget', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'post').and.returnValue(Promise.resolve());
      spyOn(apiUtil, 'put').and.returnValue(Promise.resolve());
      spyOn(budgetTransformer, 'transformToApi').and.returnValue('transformedBudget');
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ currentAccount: { id: 12 } }) });
    });

    it('makes a post request if it has no id', () => {
      budgetActions.saveBudget({ description: 'my description' });

      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_BUDGET });
      expect(apiUtil.post).toHaveBeenCalled();
      expect(budgetTransformer.transformToApi).toHaveBeenCalledWith({ description: 'my description' });

      const postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('accounts/12/budgets');
      expect(postArgs.body).toEqual({ budget: 'transformedBudget' });
      expect(postArgs.onSuccess).toEqual(budgetActions.fetchBudgets);
    });

    it('makes a put request if it has an id', () => {
      budgetActions.saveBudget({ id: 1, description: 'my description' });

      expect(store.dispatch).toHaveBeenCalledWith({ type: SAVE_BUDGET });
      expect(apiUtil.put).toHaveBeenCalled();
      expect(budgetTransformer.transformToApi).toHaveBeenCalledWith({ id: 1, description: 'my description' });

      const putArgs = apiUtil.put.calls.argsFor(0)[0];
      expect(putArgs.url).toEqual('accounts/12/budgets/1');
      expect(putArgs.body).toEqual({ budget: 'transformedBudget' });
      expect(putArgs.onSuccess).toEqual(budgetActions.fetchBudgets);
    });
  });

  describe('deleteBudget', () => {
    it('makes a delete request', () => {
      spyOn(apiUtil, 'delete').and.returnValue(Promise.resolve());
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ currentAccount: { id: 12 } }) });

      budgetActions.deleteBudget({ id: 1, description: 'my description' });

      expect(store.dispatch).toHaveBeenCalledWith({ type: DELETE_BUDGET });
      expect(apiUtil.delete).toHaveBeenCalled();

      const deleteArgs = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('accounts/12/budgets/1');
      expect(deleteArgs.onSuccess).toEqual(budgetActions.fetchBudgets);
    });
  });
});
