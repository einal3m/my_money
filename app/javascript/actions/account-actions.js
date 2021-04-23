import store from '../stores/store';
import apiUtil from '../util/api-util';
import accountTransformer from '../transformers/account-transformer';
import {
  GET_ACCOUNTS,
  SET_ACCOUNTS,
  GET_ACCOUNT_TYPES,
  SET_CURRENT_ACCOUNT,
  SET_ACCOUNT_TYPES,
  SET_SELECTED_ACCOUNTS,
  SAVE_ACCOUNT,
  DELETE_ACCOUNT,
} from 'actions/action-types';

export function getAccounts(options) {
  return getAccountTypes().then(() => fetchAccounts(options));
}

export function fetchAccounts(options) {
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

export function storeAccounts(accounts) {
  store.dispatch({ type: SET_ACCOUNTS, accounts });
}

export function getAccountTypes() {
  const accountTypesLoaded = store.getState().accountStore.get('accountTypesLoaded');
  if (accountTypesLoaded) {
    return Promise.resolve();
  }

  store.dispatch({ type: GET_ACCOUNT_TYPES });
  return apiUtil.get({
    url: 'account_types',
    onSuccess: response => storeAccountTypes(response.account_types),
  });
}

function storeAccountTypes(accountTypes) {
  store.dispatch({ type: SET_ACCOUNT_TYPES, accountTypes });
}

export function setCurrentAccount(id) {
  store.dispatch({ type: SET_CURRENT_ACCOUNT, id });
}

export function setSelectedAccounts(accountIds) {
  store.dispatch({ type: SET_SELECTED_ACCOUNTS, accountIds });
}

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

export function deleteAccount(id) {
  store.dispatch({ type: DELETE_ACCOUNT });
  return apiUtil.delete({
    url: `accounts/${id}`,
    onSuccess: getAccounts,
  });
}
