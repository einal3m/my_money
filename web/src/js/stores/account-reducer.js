import { Map, List, fromJS } from 'immutable';
import {
  SET_ACCOUNTS,
  SET_CURRENT_ACCOUNT,
  SET_ACCOUNT_TYPES,
  SET_SELECTED_ACCOUNTS,
} from '../actions/account-actions';

const INITIAL_STATE = Map({
  loaded: false,
  accountTypesLoaded: false,
  accounts: List(),
  accountTypes: List([]),
  currentAccount: Map({}),
  selectedAccounts: List([]),
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case SET_ACCOUNTS:
      return setAccounts(state, action.accounts);
    case SET_ACCOUNT_TYPES:
      return setAccountTypes(state, action.accountTypes);
    case SET_CURRENT_ACCOUNT:
      return setCurrentAccount(state, action.id);
    case SET_SELECTED_ACCOUNTS:
      return setSelectedAccounts(state, action.accountIds);
    default:
      return state;
  }
}

function setAccounts(state, accounts) {
  return state.set('loaded', true)
              .set('accounts', fromJS(accounts))
              .set('currentAccount', currentAccount(state, accounts))
              .set('selectedAccounts', defaultSelectedAccount(accounts));
}

function setAccountTypes(state, accountTypes) {
  return state.set('accountTypesLoaded', true)
              .set('accountTypes', fromJS(accountTypes));
}

function currentAccount(state, accounts) {
  if (state.get('currentAccount').get('id') && currentAccountExists(state, accounts)) {
    return state.get('currentAccount');
  }
  return Map(firstAccount(accounts));
}

function defaultSelectedAccount(accounts) {
  if (accounts.length > 0) return List([accounts[0].id]);
  return List([]);
}

function firstAccount(accounts) {
  if (accounts.length > 0) return accounts[0];
  return {};
}

function currentAccountExists(state, accounts) {
  return accounts.filter(account => account.id === state.get('currentAccount').get('id')).length > 0;
}

function setCurrentAccount(state, id) {
  return state.set('currentAccount', state.get('accounts').find(account => account.get('id') === id));
}

function setSelectedAccounts(state, accountIds) {
  return state.set('selectedAccounts', fromJS(accountIds));
}
