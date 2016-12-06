import { fromJS } from 'immutable';
import reportActions, {
  getCategoryReport, getSubcategoryReport, toggleReportView, getIncomeExpenseBarReport,
  SET_ACCOUNT_BALANCE_REPORT, SET_TRANSACTION_REPORT, GET_REPORT, TOGGLE_REPORT_VIEW, SET_TOTALS_REPORT,
} from '../report-actions';
import transactionTransformer from '../../transformers/transaction-transformer';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';

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

  describe('getCategoryReport', () => {
    it('calls the report/category api and dispatches response to the store', () => {
      spyOn(apiUtil, 'get');
      spyOn(transactionTransformer, 'transformFromApi').and.returnValue('transformedTransaction');
      spyOn(store, 'getState').and.returnValue({
        categoryStore: fromJS({ currentCategoryId: 34 }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      getCategoryReport();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_REPORT' });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('report/category?category_id=34&from_date=2016-03-01&to_date=2016-03-31');

      const successCallback = getArgs.onSuccess;
      successCallback({ transactions: ['transaction'], month_totals: ['totals'] });

      expect(transactionTransformer.transformFromApi).toHaveBeenCalledWith('transaction');
      expect(store.dispatch).toHaveBeenCalledWith(
        { type: SET_TRANSACTION_REPORT, transactions: ['transformedTransaction'], totals: ['totals'] }
      );
    });
  });

  describe('getSubcategoryReport', () => {
    it('calls the report/subcategory api and dispatches response to the store', () => {
      spyOn(apiUtil, 'get');
      spyOn(transactionTransformer, 'transformFromApi').and.returnValue('transformedTransaction');
      spyOn(store, 'getState').and.returnValue({
        categoryStore: fromJS({ currentCategoryId: 34, currentSubcategoryId: 12 }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      getSubcategoryReport();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_REPORT' });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual(
        'report/subcategory?category_id=34&subcategory_id=12&from_date=2016-03-01&to_date=2016-03-31'
      );

      const successCallback = getArgs.onSuccess;
      successCallback({ transactions: ['transaction'], month_totals: ['totals'] });

      expect(transactionTransformer.transformFromApi).toHaveBeenCalledWith('transaction');
      expect(store.dispatch).toHaveBeenCalledWith(
        { type: SET_TRANSACTION_REPORT, transactions: ['transformedTransaction'], totals: ['totals'] }
      );
    });
  });

  describe('toggleReportView', () => {
    it('dispatches the action to the store', () => {
      toggleReportView();

      expect(store.dispatch).toHaveBeenCalledWith({ type: TOGGLE_REPORT_VIEW });
    });
  });

  describe('getIncomeExpenseBarReport', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'get');
      getIncomeExpenseBarReport();
    });

    it('calls the report/subcategory api and dispatches response to the store', () => {
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_REPORT' });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('report/income_expense_bar');
    });

    it('onSuccess, stores the totals in the store', () => {
      const getArgs = apiUtil.get.calls.argsFor(0)[0];

      getArgs.onSuccess({ report: ['totals'] });

      expect(store.dispatch).toHaveBeenCalledWith({ type: SET_TOTALS_REPORT, totals: ['totals'] });
    });
  });
});
