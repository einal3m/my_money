import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  loaded: false,
  accounts: List(),
  accountTypes: List([
    Map({ id:1, code: 'savings', name:'Savings' }),
    Map({ id:2, code: 'share', name: 'Share' })
  ]),
  currentAccount: Map({}),
  selectedAccounts: List([])
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
  case 'ADD_SELECTED_ACCOUNT':
    return addSelectedAccount(state, action.accountId);
  case 'REMOVE_SELECTED_ACCOUNT':
    return removeSelectedAccount(state, action.index);
  case 'SET_SELECTED_ACCOUNT':
    return setSelectedAccount(state, action.index, action.accountId);
  }
  return state;
}
 
function setAccounts(state, accounts) {
  return state.set('loaded', true)
              .set('accounts', fromJS(accounts))
              .set('currentAccount', Map(accounts[0]));
}

function addAccount(state, account) {
  const accounts = state.get('accounts').push(fromJS(account));
  return state.set('currentAccount', fromJS(account))
              .set('accounts', accounts);
}

function removeAccount(state, id) {
  const accounts = state.get('accounts').filter(account => account.get('id') !== id);
  let currentAccount = state.get('currentAccount');
  if (state.get('currentAccount').get('id') === id){
    currentAccount = accounts.first() || null;
  }

  return state.set('accounts', accounts)
              .set('currentAccount', currentAccount);
}

function setCurrentAccount(state, id) {
  return state.set('currentAccount', state.get('accounts').find(account => account.get('id') === id));
}

function addSelectedAccount(state, accountId) {
  return state.set('selectedAccounts', state.get('selectedAccounts').push(accountId));
}

function removeSelectedAccount(state, index) {
  return state.set('selectedAccounts', state.get('selectedAccounts').delete(index));
}

function setSelectedAccount(state, index, accountId) {
  return state.set('selectedAccounts', state.get('selectedAccounts').set(index, accountId));
}
