import store from '../stores/store';
import apiUtil from '../util/api-util';
import { getAccounts } from './account-actions';

export const GET_PATTERNS = 'GET_PATTERNS';
export function getPatterns() {
  getAccounts({ useStore: true }).then(() => fetchPatterns());
}

export function fetchPatterns() {
  store.dispatch({ type: GET_PATTERNS });

  const accountId = store.getState().accountStore.get('currentAccount').get('id');

  return apiUtil.get({
    url: `accounts/${accountId}/patterns`,
    onSuccess: (response) => { storePatterns(response.patterns); },
  });
}

export const SET_PATTERNS = 'SET_PATTERNS';
function storePatterns(patterns) {
  store.dispatch({ type: SET_PATTERNS, patterns });
}
