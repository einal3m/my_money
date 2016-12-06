import { Map, List, fromJS } from 'immutable';
import {
  GET_REPORT, SET_ACCOUNT_BALANCE_REPORT, SET_TRANSACTION_REPORT, TOGGLE_REPORT_VIEW, SET_TOTALS_REPORT,
} from '../actions/report-actions';

const INITIAL_STATE = Map({
  accountBalances: Map({}),
  transactions: List(),
  totals: List(),
  loaded: false,
  viewType: 'table',
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case GET_REPORT:
      return getReport(state);
    case SET_ACCOUNT_BALANCE_REPORT:
      return setAccountBalances(state, action.accountId, action.report);
    case SET_TRANSACTION_REPORT:
      return setTransactionReport(state, action.transactions, action.totals);
    case SET_TOTALS_REPORT:
      return setTotalsReport(state, action.totals);
    case TOGGLE_REPORT_VIEW:
      return toggleReportView(state);
    default:
      return state;
  }
}

function getReport(state) {
  return state.set('loaded', false)
    .set('accountBalances', Map({}))
    .set('transactions', List())
    .set('totals', List());
}

function setAccountBalances(state, accountId, report) {
  return state.set('loaded', true).set('accountBalances', state.get('accountBalances').set(accountId, fromJS(report)));
}

function setTransactionReport(state, transactions, totals) {
  return state.set('loaded', true).set('transactions', fromJS(transactions)).set('totals', fromJS(totals));
}

function setTotalsReport(state, totals) {
  return state.set('loaded', true).set('totals', fromJS(totals));
}

function toggleReportView(state) {
  const view = state.get('viewType') === 'chart' ? 'table' : 'chart';
  return state.set('viewType', view);
}
