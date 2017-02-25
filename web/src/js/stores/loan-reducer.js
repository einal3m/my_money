import { Map, List, fromJS } from 'immutable';
import { SET_LOAN_REPORT } from '../actions/loan-actions';

const INITIAL_STATE = Map({
  minimumRepayment: null,
  minimumRepaymentBalances: null,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case SET_LOAN_REPORT:
      return setLoanReport(state, action.report);
    default:
      return state;
  }
}

function setLoanReport(state, report) {
  return state.set('minimumRepayment', report.minimum_repayment)
              .set('minimumRepaymentBalances', fromJS(report.minimum_amortization));
}
