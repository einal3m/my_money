import { Map, List, fromJS } from 'immutable';
import { GET_REPORT, SET_ACCOUNT_BALANCE_REPORT, SET_TRANSACTION_REPORT } from '../actions/report-actions';

const INITIAL_STATE = Map({
  accountBalances: Map({}),
  transactions: List(),
  totals: List(),
  loaded: false,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case GET_REPORT:
      return state.set('loaded', false);
    case SET_ACCOUNT_BALANCE_REPORT:
      return setAccountBalances(state, action.accountId, action.report);
    case SET_TRANSACTION_REPORT:
      return setTransactionReport(state, action.transactions, action.totals);
    default:
      return state;
  }
}

function setAccountBalances(state, accountId, report) {
  return state.set('loaded', true).set('accountBalances', state.get('accountBalances').set(accountId, fromJS(report)));
}

function setTransactionReport(state, transactions, totals) {
  return state.set('loaded', true).set('transactions', fromJS(transactions)).set('totals', fromJS(totals));
}
