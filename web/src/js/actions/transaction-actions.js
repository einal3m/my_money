import apiUtil from '../util/api-util';
import store from '../stores/store';
import { getAccounts } from './account-actions';
import { getDateRanges } from './date-range-actions';
import { getCategories } from './category-actions';
import transactionTransformer from '../transformers/transaction-transformer';
import { SOURCE_CATEGORY_REPORT, SOURCE_SUBCATEGORY_REPORT } from './form-actions';
import { getCategoryReport, getSubcategoryReport } from './report-actions';

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export function getTransactions() {
  Promise.all([
    getAccounts({ useStore: true }),
    getDateRanges(),
    getCategories({ useStore: true }),
  ]).then(() => fetchTransactions());
}

export function fetchTransactions() {
  const accountId = store.getState().accountStore.get('currentAccount').get('id');
  const dateRange = store.getState().dateRangeStore.get('currentDateRange');
  const fromDate = dateRange.get('fromDate');
  const toDate = dateRange.get('toDate');
  let description;
  const moreOptions = store.getState().transactionStore.get('moreOptions');
  if (moreOptions) {
    description = store.getState().transactionStore.get('searchDescription');
  }

  let url = `accounts/${accountId}/transactions?from_date=${fromDate}&to_date=${toDate}`;
  if (description) {
    url = `${url}&description=${description}`;
  }

  return apiUtil.get({
    url,
    onSuccess: response => storeTransactions(
      response.transactions.map(transaction => transactionTransformer.transformFromApi(transaction))
    ),
  });
}

export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';
export function saveTransaction(transaction) {
  store.dispatch({ type: SAVE_TRANSACTION });
  if (transaction.id) {
    updateTransaction(transaction);
  } else {
    createTransaction(transaction);
  }
}

function createTransaction(transaction) {
  return apiUtil.post({
    url: `accounts/${transaction.accountId}/transactions`,
    body: { transaction: transactionTransformer.transformToApi(transaction) },
    onSuccess: () => { getTransactions(); },
  });
}

function updateTransaction(transaction) {
  return apiUtil.put({
    url: `accounts/${transaction.accountId}/transactions/${transaction.id}`,
    body: { transaction: transactionTransformer.transformToApi(transaction) },
    onSuccess: () => { onSuccess(); },
  });
}

export function onSuccess() {
  const source = store.getState().formStore.get('source');

  switch (source) {
    case SOURCE_CATEGORY_REPORT:
      getCategoryReport();
      return;
    case SOURCE_SUBCATEGORY_REPORT:
      getSubcategoryReport();
      return;
    default:
      getTransactions();
      return;
  }
}

export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export function deleteTransaction(transaction) {
  store.dispatch({ type: DELETE_TRANSACTION });
  return apiUtil.delete({
    url: `accounts/${transaction.accountId}/transactions/${transaction.id}`,
    onSuccess: () => { onSuccess(); },
  });
}

export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export function storeTransactions(transactions) {
  store.dispatch({ type: SET_TRANSACTIONS, transactions });
}

export const SET_SEARCH_DESCRIPTION = 'SET_SEARCH_DESCRIPTION';
export const setSearchDescription = (description) => {
  store.dispatch({ type: SET_SEARCH_DESCRIPTION, description });
};

export const TOGGLE_MORE_OR_LESS = 'TOGGLE_MORE_OR_LESS';
export const toggleMoreOrLess = () => {
  store.dispatch({ type: TOGGLE_MORE_OR_LESS });
};
