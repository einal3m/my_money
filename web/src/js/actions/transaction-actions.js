import transactionApi from '../apis/transaction-api';
import store from '../stores/store';
import accountActions from './account-actions';
import dateRangeActions from './date-range-actions';

class TransactionActions {

  getTransactions() {
    accountActions.getAccounts().then(() => {
      dateRangeActions.getDateRanges().then(() => {

        let account = store.getState().accountStore.get('currentAccount');
        let dateRange = store.getState().dateRangeStore.get('currentDateRange');
        let description;
        let moreOptions = store.getState().transactionStore.get('moreOptions');
        if (moreOptions) {
          description = store.getState().transactionStore.get('searchDescription');
        }
        transactionApi.index(account.get('id'), dateRange.get('fromDate'), dateRange.get('toDate'), description);
    })});
  }

  storeTransactions(transactions) {
    store.dispatch({ type: 'SET_TRANSACTIONS', transactions: transactions });
  }

  setSearchDescription(description) {
    store.dispatch({ type: 'SET_SEARCH_DESCRIPTION', description: description });
  }

  toggleMoreOrLess() {
    store.dispatch({ type: 'TOGGLE_MORE_OR_LESS' });
  }
}

export default new TransactionActions();
