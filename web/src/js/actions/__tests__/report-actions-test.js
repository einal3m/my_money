import reportActions from '../report-actions';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';
import { fromJS } from 'immutable';

describe('ReportActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('get EOD balance report', () => {
    it('getAccountBalanceReport calls the report api', () => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({ selectedAccounts: [34] }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      reportActions.getAccountBalanceReport();
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_REPORT' });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('report/eod_balance?account_id=34&from_date=2016-03-01&to_date=2016-03-31');

      spyOn(reportActions, 'storeAccountBalanceReport');
      const successCallback = getArgs.onSuccess;
      successCallback({ report: ['balances'] });

      expect(reportActions.storeAccountBalanceReport).toHaveBeenCalledWith(34, ['balances']);
    });
  });

  it('storeAccountBalanceReport dispatches the date range data to the store', () => {
    reportActions.storeAccountBalanceReport(34, ['balances']);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: 'SET_ACCOUNT_BALANCE_REPORT',
      accountId: 34,
      report: ['balances'],
    });
  });
});
