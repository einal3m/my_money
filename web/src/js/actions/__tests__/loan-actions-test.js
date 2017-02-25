import { fromJS } from 'immutable';
import * as loanActions from '../loan-actions';
import { GET_REPORT } from '../report-actions';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';

describe('LoanActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('fetchLoanReport', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({ currentAccount: { id: 22 } }),
      });
    });

    it('calls the loan report api', () => {
      loanActions.fetchLoanReport();

      expect(dispatcherSpy).toHaveBeenCalledWith({ type: GET_REPORT });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('report/home_loan?account_id=22');
    });

    it('saves the report data to the store on success', () => {
      loanActions.fetchLoanReport();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];

      getArgs.onSuccess({ minimum_repayment: 3456 });

      expect(dispatcherSpy).toHaveBeenCalledWith(
        { type: loanActions.SET_LOAN_REPORT, report: { minimum_repayment: 3456 } }
      );
    });
  });
});
