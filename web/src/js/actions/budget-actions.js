import store from '../stores/store';
import apiUtil from '../util/api-util';
import { getAccounts } from './account-actions';
import { transformFromApi } from '../transformers/budget-transformer';

export const GET_BUDGETS = 'GET_BUDGETS';
export function getBudgets() {
  return Promise.all([
    getAccounts({ useStore: true }),
  ]).then(() => fetchBudgets());
}

export function fetchBudgets() {
  store.dispatch({ type: GET_BUDGETS });
  const accountId = store.getState().accountStore.get('currentAccount').get('id');

  return apiUtil.get({
    url: `accounts/${accountId}/budgets`,
    onSuccess: (response) => {
      storeBudgets(response.budgets.map(budget => transformFromApi(budget)));
    },
  });
}

export const SET_BUDGETS = 'SET_BUDGETS';
function storeBudgets(budgets) {
  store.dispatch({ type: SET_BUDGETS, budgets });
}
