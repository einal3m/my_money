import store from '../stores/store';
import apiUtil from '../util/api-util';
import { getAccounts } from './account-actions';
import { getCategories } from './category-actions';
import patternTransformer from '../transformers/pattern-transformer';

export const GET_PATTERNS = 'GET_PATTERNS';
export function getPatterns() {
  return Promise.all([
    getAccounts({ useStore: true }),
    getCategories({ useStore: true }),
  ]).then(() => fetchPatterns());
}

export function fetchPatterns() {
  store.dispatch({ type: GET_PATTERNS });
  const accountId = store.getState().accountStore.get('currentAccount').get('id');

  return apiUtil.get({
    url: `accounts/${accountId}/patterns`,
    onSuccess: (response) => {
      storePatterns(response.patterns.map(pattern => patternTransformer.transformFromApi(pattern)));
    },
  });
}

export const SET_PATTERNS = 'SET_PATTERNS';
function storePatterns(patterns) {
  store.dispatch({ type: SET_PATTERNS, patterns });
}

export const SAVE_PATTERN = 'SAVE_PATTERN';
export function savePattern(pattern) {
  store.dispatch({ type: SAVE_PATTERN });
  if (pattern.id) {
    updatePattern(pattern);
  } else {
    createPattern(pattern);
  }
}

function createPattern(pattern) {
  return apiUtil.post({
    url: `accounts/${pattern.accountId}/patterns`,
    body: { pattern: patternTransformer.transformToApi(pattern) },
    onSuccess: getPatterns,
  });
}

function updatePattern(pattern) {
  return apiUtil.put({
    url: `accounts/${pattern.accountId}/patterns/${pattern.id}`,
    body: { pattern: patternTransformer.transformToApi(pattern) },
    onSuccess: getPatterns,
  });
}

export const DELETE_PATTERN = 'DELETE_PATTERN';
export function deletePattern(pattern) {
  store.dispatch({ type: DELETE_PATTERN });
  return apiUtil.delete({
    url: `accounts/${pattern.accountId}/patterns/${pattern.id}`,
    onSuccess: getPatterns,
  });
}
