import store from '../stores/store';
import apiUtil from '../util/api-util';
import { getAccounts } from './account-actions';
import { transformFromApi } from '../transformers/reconciliation-transformer';

export const GET_RECONCILIATIONS = 'GET_RECONCILIATIONS';
export function getReconciliations() {
  return Promise.all([
    getAccounts({ useStore: true }),
  ]).then(() => fetchReconciliations());
}

export function fetchReconciliations() {
  store.dispatch({ type: GET_RECONCILIATIONS });
  const accountId = store.getState().accountStore.get('currentAccount').get('id');

  return apiUtil.get({
    url: `accounts/${accountId}/reconciliations`,
    onSuccess: (response) => {
      storeReconciliations(response.reconciliations.map(reconciliation => transformFromApi(reconciliation)));
    },
  });
}

export const SET_RECONCILIATIONS = 'SET_RECONCILIATIONS';
function storeReconciliations(reconciliations) {
  store.dispatch({ type: SET_RECONCILIATIONS, reconciliations });
}

export function saveReconciliation(reconciliation) {

}
