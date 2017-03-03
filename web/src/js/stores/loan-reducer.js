import { Map, fromJS } from 'immutable';
import { SET_LOAN_REPORT, SET_LOAN_VIEW } from '../actions/loan-actions';

const INITIAL_STATE = Map({
  minimumRepayment: null,
  minimumRepaymentBalances: null,
  budgetRepaymentBalances: null,
  view: 'chart',
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case SET_LOAN_REPORT:
      return setLoanReport(state, action.report);
    case SET_LOAN_VIEW:
      return state.set('view', action.view);
    default:
      return state;
  }
}

function setLoanReport(state, report) {
  return state.set('minimumRepayment', report.minimum_repayment)
              .set('minimumRepaymentBalances', fromJS(report.minimum_amortization))
              .set('budgetRepaymentBalances', fromJS(report.budget_amortization));
}
