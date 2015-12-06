import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  loading: false,
  transactions: List()
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
  case 'SET_TRANSACTIONS':
    return setTransactions(state, action.transactions);
  case 'FETCHING_TRANSACTIONS':
    return setLoadingState(state);
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
