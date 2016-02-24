import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  transactions: List(),
  fileName: null
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
  case 'SET_OFX_TRANSACTIONS':
    return setOfxTransactions(state, action.transactions);
  case 'UPLOAD_OFX':
    return setFileName(state, action.fileName);
  }
  return state;
}

function setOfxTransactions(state, transactions) {
  return state.set('transactions', fromJS(transactions));
}

function setFileName(state, fileName) {
  return state.set('fileName', fileName);
}
