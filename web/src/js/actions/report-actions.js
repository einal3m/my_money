import apiUtil from '../util/api-util';
import store from '../stores/store';
import transactionTransformer from '../transformers/transaction-transformer';
import { getCategories } from '../actions/category-actions';
import { getDateRanges } from '../actions/date-range-actions';
import { getAccounts } from '../actions/account-actions';

export const GET_REPORT = 'GET_REPORT';
export const SET_ACCOUNT_BALANCE_REPORT = 'SET_ACCOUNT_BALANCE_REPORT';

export function getAccountBalanceReport() {
  Promise.all([
    getAccounts({ useStore: true }),
    getDateRanges(),
  ]).then(() => fetchAccountBalanceReport());
}

export function fetchAccountBalanceReport() {
  const selectedAccounts = store.getState().accountStore.get('selectedAccounts').toJS();
  const dateRange = store.getState().dateRangeStore.get('currentDateRange').toJS();

  selectedAccounts.forEach((accountId) => {
    store.dispatch({ type: GET_REPORT });
    return apiUtil.get({
      url: `report/eod_balance?account_id=${accountId}&from_date=${dateRange.fromDate}&to_date=${dateRange.toDate}`,
      onSuccess: response => storeAccountBalanceReport(accountId, response.report),
    });
  });
}

function storeAccountBalanceReport(accountId, report) {
  store.dispatch({ type: SET_ACCOUNT_BALANCE_REPORT, accountId, report });
}

export const TOGGLE_REPORT_VIEW = 'TOGGLE_REPORT_VIEW';
export function toggleReportView() {
  store.dispatch({ type: TOGGLE_REPORT_VIEW });
}

export function getSubcategoryReport() {
  Promise.all([
    getCategories({ useStore: true }),
    getDateRanges(),
    getAccounts({ useStore: true }),
  ]).then(() => {
    fetchSubcategoryReport();
  });
}

export function fetchSubcategoryReport() {
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
  Promise.all([
    getCategories({ useStore: true }),
    getDateRanges(),
    getAccounts({ useStore: true }),
  ]).then(() => {
    fetchCategoryReport();
  });
}

export function fetchCategoryReport() {
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

export function getIncomeVsExpensesReport() {
  Promise.all([
    getDateRanges(),
    getCategories({ userStore: true }),
    getAccounts({ useStore: true }),
  ]).then(() => {
    fetchIncomeVsExpensesReport();
  });
}

export const SET_INCOME_VS_EXPENSE = 'SET_INCOME_VS_EXPENSE';
export function fetchIncomeVsExpensesReport() {
  const dateRange = store.getState().dateRangeStore.get('currentDateRange').toJS();
  const url = `report/income_vs_expense?from_date=${dateRange.fromDate}&to_date=${dateRange.toDate}`;

  store.dispatch({ type: GET_REPORT });
  return apiUtil.get({
    url,
    onSuccess: storeIncomeVsExpensesReport,
  });
}

function storeIncomeVsExpensesReport(response) {
  store.dispatch({
    type: SET_INCOME_VS_EXPENSE,
    incomeVsExpense: response,
  });
}
