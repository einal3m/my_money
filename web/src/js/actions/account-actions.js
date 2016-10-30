import store from '../stores/store';
import apiUtil from '../util/api-util';
import accountTransformer from '../transformers/account-transformer';

export const GET_ACCOUNTS = 'GET_ACCOUNTS';
export function getAccounts(options) {
  const accountsLoaded = store.getState().accountStore.get('loaded');

  if (accountsLoaded && options && options.useStore) {
    return Promise.resolve();
  }

  store.dispatch({ type: GET_ACCOUNTS });
  return apiUtil.get({
    url: 'accounts',
    onSuccess: response => storeAccounts(
      response.accounts.map(account => accountTransformer.transformFromApi(account))
    ),
  });
}

export const SET_ACCOUNTS = 'SET_ACCOUNTS';
function storeAccounts(accounts) {
  store.dispatch({ type: SET_ACCOUNTS, accounts });
}

export const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';
export function setCurrentAccount(id) {
  store.dispatch({ type: SET_CURRENT_ACCOUNT, id });
}

export const TOGGLE_SELECTED_ACCOUNT = 'TOGGLE_SELECTED_ACCOUNT';
export function toggleSelectedAccount(accountId) {
  store.dispatch({ type: TOGGLE_SELECTED_ACCOUNT, accountId });
}

export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
export function saveAccount(account) {
  store.dispatch({ type: SAVE_ACCOUNT });
  if (account.id) {
    updateAccount(account);
  } else {
    createAccount(account);
  }
}

function createAccount(account) {
  return apiUtil.post({
    url: 'accounts',
    body: { account: accountTransformer.transformToApi(account) },
    onSuccess: getAccounts,
  });
}

function updateAccount(account) {
  return apiUtil.put({
    url: `accounts/${account.id}`,
    body: { account: accountTransformer.transformToApi(account) },
    onSuccess: getAccounts,
  });
}

export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export function deleteAccount(id) {
  store.dispatch({ type: DELETE_ACCOUNT });
  return apiUtil.delete({
    url: `accounts/${id}`,
    onSuccess: getAccounts,
  });
}
