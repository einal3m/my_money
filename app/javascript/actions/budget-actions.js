import store from '../stores/store';
import apiUtil from '../util/api-util';
import { getAccounts } from './account-actions';
import { transformFromApi, transformToApi } from '../transformers/budget-transformer';

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

export const SAVE_BUDGET = 'SAVE_BUDGET';
export function saveBudget(budget) {
  store.dispatch({ type: SAVE_BUDGET });
  const accountId = store.getState().accountStore.get('currentAccount').get('id');

  if (budget.id) return updateBudget(accountId, budget);
  return createBudget(accountId, budget);
}

function createBudget(accountId, budget) {
  return apiUtil.post({
    url: `accounts/${accountId}/budgets`,
    body: { budget: transformToApi(budget) },
    onSuccess: fetchBudgets,
  });
}

function updateBudget(accountId, budget) {
  return apiUtil.put({
    url: `accounts/${accountId}/budgets/${budget.id}`,
    body: { budget: transformToApi(budget) },
    onSuccess: fetchBudgets,
  });
}

export const DELETE_BUDGET = 'DELETE_BUDGET';
export function deleteBudget(budget) {
  store.dispatch({ type: DELETE_BUDGET });
  const accountId = store.getState().accountStore.get('currentAccount').get('id');

  return apiUtil.delete({
    url: `accounts/${accountId}/budgets/${budget.id}`,
    onSuccess: fetchBudgets,
  });
}
