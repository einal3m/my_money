import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  transactions: List()
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
  case 'SET_OFX_TRANSACTIONS':
    return setOfxTransactions(state, action.transactions);
  }
  return state;
}

function setOfxTransactions(state, transactions) {
  return state.set('transactions', fromJS(transactions));
}
