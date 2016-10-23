import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  loading: false,
  transactions: List(),
  moreOptions: false,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return setTransactions(state, action.transactions);
    case 'FETCHING_TRANSACTIONS':
      return setLoadingState(state);
    case 'SET_SEARCH_DESCRIPTION':
      return setSearchDescription(state, action.description);
    case 'TOGGLE_MORE_OR_LESS':
      return toggleMoreOrLess(state);
  }
  return state;
}

function setTransactions(state, transactions) {
  return state.set('transactions', fromJS(transactions))
              .set('loading', false);
}

function setLoadingState(state) {
  return state.set('transactions', List())
              .set('loading', true);
}

function setSearchDescription(state, description) {
  return state.set('searchDescription', description);
}

function toggleMoreOrLess(state) {
  return state.set('moreOptions', !state.get('moreOptions'));
}
