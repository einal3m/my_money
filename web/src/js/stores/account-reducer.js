import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  loaded: false,
  accounts: List(),
  accountTypes: List([
    Map({ id: 1, code: 'savings', name: 'Savings' }),
    Map({ id: 2, code: 'share', name: 'Share' }),
  ]),
  currentAccount: Map({}),
  selectedAccounts: List([]),
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return setAccounts(state, action.accounts);
    case 'ADD_ACCOUNT':
      return addAccount(state, action.account);
    case 'REMOVE_ACCOUNT':
      return removeAccount(state, action.id);
    case 'SET_CURRENT_ACCOUNT':
      return setCurrentAccount(state, action.id);
    case 'TOGGLE_SELECTED_ACCOUNT':
      return toggleSelectedAccount(state, action.accountId);
  }
  return state;
}

function setAccounts(state, accounts) {
  return state.set('loaded', true)
              .set('accounts', fromJS(accounts))
              .set('currentAccount', currentAccount(state, accounts))
              .set('selectedAccounts', List([accounts[0].id]));
}

function currentAccount(state, accounts) {
  if (state.get('currentAccount').get('id')) {
    return state.get('currentAccount');
  }
  return Map(accounts[0]);
}

function addAccount(state, account) {
  const accounts = state.get('accounts').push(fromJS(account));
  return state.set('currentAccount', fromJS(account))
              .set('accounts', accounts);
}

function removeAccount(state, id) {
  const accounts = state.get('accounts').filter(account => account.get('id') !== id);
  let currentAccount = state.get('currentAccount');
  if (state.get('currentAccount').get('id') === id) {
    currentAccount = accounts.first() || null;
  }

  return state.set('accounts', accounts)
              .set('currentAccount', currentAccount);
}

function setCurrentAccount(state, id) {
  return state.set('currentAccount', state.get('accounts').find(account => account.get('id') === id));
}

function toggleSelectedAccount(state, accountId) {
  const selected = state.get('selectedAccounts').includes(accountId);
  return selected ? removeSelectedAccount(state, accountId) : addSelectedAccount(state, accountId);
}

function addSelectedAccount(state, accountId) {
  return state.set('selectedAccounts', state.get('selectedAccounts').push(accountId));
}

function removeSelectedAccount(state, accountId) {
  return state.set('selectedAccounts', state.get('selectedAccounts').filter(id => id !== accountId));
}
