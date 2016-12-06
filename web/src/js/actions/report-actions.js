import apiUtil from '../util/api-util';
import store from '../stores/store';
import transactionTransformer from '../transformers/transaction-transformer';

export const GET_REPORT = 'GET_REPORT';
export const SET_ACCOUNT_BALANCE_REPORT = 'SET_ACCOUNT_BALANCE_REPORT';

class ReportActions {
  getAccountBalanceReport() {
    const selectedAccounts = store.getState().accountStore.get('selectedAccounts');
    const dateRange = store.getState().dateRangeStore.get('currentDateRange').toJS();

    selectedAccounts.forEach((accountId) => {
      store.dispatch({ type: GET_REPORT });
      return apiUtil.get({
        url: `report/eod_balance?account_id=${accountId}&from_date=${dateRange.fromDate}&to_date=${dateRange.toDate}`,
        onSuccess: response => this.storeAccountBalanceReport(accountId, response.report),
      });
    });
  }

  storeAccountBalanceReport = (accountId, report) => {
    store.dispatch({ type: SET_ACCOUNT_BALANCE_REPORT, accountId, report });
  };
}

export const TOGGLE_REPORT_VIEW = 'TOGGLE_REPORT_VIEW';
export function toggleReportView() {
  store.dispatch({ type: TOGGLE_REPORT_VIEW });
}

export function getSubcategoryReport() {
  const currentCategoryId = store.getState().categoryStore.get('currentCategoryId');
  const currentSubcategoryId = store.getState().categoryStore.get('currentSubcategoryId');
  const dateRange = store.getState().dateRangeStore.get('currentDateRange').toJS();

  let url = `report/subcategory?category_id=${currentCategoryId || ''}&subcategory_id=${currentSubcategoryId || ''}`;
  url += `&from_date=${dateRange.fromDate}&to_date=${dateRange.toDate}`;

  store.dispatch({ type: GET_REPORT });
  return apiUtil.get({
    url,
    onSuccess: response => storeTransactionReport(
      response.transactions.map(transaction => transactionTransformer.transformFromApi(transaction)),
      response.month_totals
    ),
  });
}

export function getCategoryReport() {
  const currentCategoryId = store.getState().categoryStore.get('currentCategoryId');
  const dateRange = store.getState().dateRangeStore.get('currentDateRange').toJS();

  let url = `report/category?category_id=${currentCategoryId || ''}`;
  url += `&from_date=${dateRange.fromDate}&to_date=${dateRange.toDate}`;

  store.dispatch({ type: GET_REPORT });
  return apiUtil.get({
    url,
    onSuccess: response => storeTransactionReport(
      response.transactions.map(transaction => transactionTransformer.transformFromApi(transaction)),
      response.month_totals
    ),
  });
}

export const SET_TRANSACTION_REPORT = 'SET_TRANSACTION_REPORT';
function storeTransactionReport(transactions, totals) {
  store.dispatch({ type: SET_TRANSACTION_REPORT, transactions, totals });
}

export function getIncomeExpenseBarReport() {
  store.dispatch({ type: GET_REPORT });
  return apiUtil.get({
    url: 'report/income_expense_bar',
    onSuccess: response => storeTotalsReport(response.report),
  });
}

export const SET_TOTALS_REPORT = 'SET_TOTALS_REPORT';
function storeTotalsReport(totals) {
  store.dispatch({ type: SET_TOTALS_REPORT, totals });
}

export default new ReportActions();
