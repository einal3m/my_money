import apiUtil from '../util/api-util';
import store from '../stores/store';
import accountActions from './account-actions';
import dateRangeActions from './date-range-actions';

class TransactionActions {

  getTransactions() {
    accountActions.getAccounts().then(() => {
      dateRangeActions.getDateRanges().then(() => {

        let accountId = store.getState().accountStore.get('currentAccount').get('id');
        let dateRange = store.getState().dateRangeStore.get('currentDateRange');
        let fromDate = dateRange.get('fromDate');
        let toDate = dateRange.get('toDate');
        let description;
        let moreOptions = store.getState().transactionStore.get('moreOptions');
        if (moreOptions) {
          description = store.getState().transactionStore.get('searchDescription');
        }

        let url = 'accounts/' + accountId + '/transactions?from_date=' + fromDate + '&to_date=' + toDate;
        if (description) {
          url = `${url}&description=${description}`;
        }

        return apiUtil.get({
          url: url,
          onSuccess: response => this.storeTransactions(response.transactions)
        });
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
