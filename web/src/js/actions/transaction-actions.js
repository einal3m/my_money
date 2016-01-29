import transactionApi from '../services/transaction-api';
import store from '../stores/store';

import accountActions from './account-actions';
import dateRangeActions from './date-range-actions';

class TransactionActions {

  fetchTransactions() {
    let accountsLoaded = store.getState().accountStore.get('loaded');
    let dateRangesLoaded = store.getState().dateRangeStore.get('loaded');
    if (!accountsLoaded) {
      accountActions.fetchAccounts(this.fetchTransactions.bind(this));
    } else if (!dateRangesLoaded) {
      dateRangeActions.fetchDateRanges(this.fetchTransactions.bind(this));
    } else {
      let account = store.getState().accountStore.get('currentAccount');
      let dateRange = store.getState().dateRangeStore.get('currentDateRange');
      transactionApi.index(account.get('id'), dateRange.get('fromDate'), dateRange.get('toDate'));
    }
  }

  storeTransactions(transactions) {
    store.dispatch({
      type: 'SET_TRANSACTIONS',
      transactions: transactions
    });
  }
}

export default new TransactionActions();
