import loanReducer from '../loan-reducer';
import { SET_LOAN_REPORT } from '../../actions/loan-actions';

describe('LoanReducer', () => {
  it('has a default state', () => {
    const state = loanReducer();

    expect(state.get('minimumRepayment')).toEqual(null);
    expect(state.get('minimumRepaymentBalances')).toEqual(null);
  });

  describe('SET_LOAN_REPORT', () => {
    it('sets the store', () => {
      const report = {
        minimum_repayment: 4500,
        minimum_amortization: [['2016-01-31', 2340], ['2016-02-29', 3456]],
      };
      const action = { type: SET_LOAN_REPORT, report };
      const state = loanReducer(undefined, action);

      expect(state.get('minimumRepayment')).toEqual(4500);
      expect(state.get('minimumRepaymentBalances').toJS()).toEqual([['2016-01-31', 2340], ['2016-02-29', 3456]]);
    });
  });
});
