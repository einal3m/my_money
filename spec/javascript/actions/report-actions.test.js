import { fromJS } from 'immutable';
import {
  fetchCategoryReport, fetchSubcategoryReport, toggleReportView, getIncomeExpenseBarReport, fetchAccountBalanceReport,
  SET_ACCOUNT_BALANCE_REPORT, SET_TRANSACTION_REPORT, GET_REPORT, TOGGLE_REPORT_VIEW, SET_TOTALS_REPORT,
  fetchIncomeVsExpensesReport, SET_INCOME_VS_EXPENSE,
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
    it('fetchAccountBalanceReport calls the report api', () => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({ selectedAccounts: [34] }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      fetchAccountBalanceReport();
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_REPORT' });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('report/eod_balance?account_id=34&from_date=2016-03-01&to_date=2016-03-31');
    });

    it('stores the report data', () => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({ selectedAccounts: [34] }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      fetchAccountBalanceReport();
      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      getArgs.onSuccess({ report: ['balances'] });

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_ACCOUNT_BALANCE_REPORT',
        accountId: 34,
        report: ['balances'],
      });
    });
  });

  describe('fetchCategoryReport', () => {
    it('calls the report/category api and dispatches response to the store', () => {
      spyOn(apiUtil, 'get');
      spyOn(transactionTransformer, 'transformFromApi').and.returnValue('transformedTransaction');
      spyOn(store, 'getState').and.returnValue({
        categoryStore: fromJS({ currentCategoryId: 34 }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      fetchCategoryReport();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_REPORT' });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('report/category?category_id=34&from_date=2016-03-01&to_date=2016-03-31');
    });

    it('stores the report data', () => {
      spyOn(apiUtil, 'get');
      spyOn(transactionTransformer, 'transformFromApi').and.returnValue('transformedTransaction');
      spyOn(store, 'getState').and.returnValue({
        categoryStore: fromJS({ currentCategoryId: 34 }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      fetchCategoryReport();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      getArgs.onSuccess({ transactions: ['transaction'], month_totals: ['totals'] });

      expect(transactionTransformer.transformFromApi).toHaveBeenCalledWith('transaction');
      expect(store.dispatch).toHaveBeenCalledWith(
        { type: SET_TRANSACTION_REPORT, transactions: ['transformedTransaction'], totals: ['totals'] }
      );
    });
  });

  describe('fetchSubcategoryReport', () => {
    it('calls the report/subcategory api and dispatches response to the store', () => {
      spyOn(apiUtil, 'get');
      spyOn(transactionTransformer, 'transformFromApi').and.returnValue('transformedTransaction');
      spyOn(store, 'getState').and.returnValue({
        categoryStore: fromJS({ currentCategoryId: 34, currentSubcategoryId: 12 }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      fetchSubcategoryReport();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_REPORT' });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual(
        'report/subcategory?category_id=34&subcategory_id=12&from_date=2016-03-01&to_date=2016-03-31'
      );
    });

    it('stores the report data', () => {
      spyOn(apiUtil, 'get');
      spyOn(transactionTransformer, 'transformFromApi').and.returnValue('transformedTransaction');
      spyOn(store, 'getState').and.returnValue({
        categoryStore: fromJS({ currentCategoryId: 34, currentSubcategoryId: 12 }),
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });

      fetchSubcategoryReport();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      getArgs.onSuccess({ transactions: ['transaction'], month_totals: ['totals'] });

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

  describe('fetchIncomeVsExpensesReport', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({
        dateRangeStore: fromJS({ currentDateRange: { fromDate: '2016-03-01', toDate: '2016-03-31' } }),
      });
      fetchIncomeVsExpensesReport();
    });

    it('calls the report/income_vs_expenses api and dispatches response to the store', () => {
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_REPORT' });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('report/income_vs_expense?from_date=2016-03-01&to_date=2016-03-31');
    });

    it('onSuccess, stores the response in the store', () => {
      const getArgs = apiUtil.get.calls.argsFor(0)[0];

      getArgs.onSuccess({ income: ['totals'] });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: SET_INCOME_VS_EXPENSE,
        incomeVsExpense: { income: ['totals'] },
      });
    });
  });
});
