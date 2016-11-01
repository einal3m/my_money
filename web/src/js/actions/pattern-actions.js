import store from '../stores/store';
import apiUtil from '../util/api-util';
import { getAccounts } from './account-actions';
import categoryActions from './category-actions';

export const GET_PATTERNS = 'GET_PATTERNS';
export function getPatterns() {
  return getAccounts({ useStore: true }).then(() => categoryActions.getCategories()).then(() => fetchPatterns());
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

export function savePattern(pattern) {
  console.log('save', pattern);
}

export function deletePattern(pattern) {
  console.log('delete', pattern.id);
}
