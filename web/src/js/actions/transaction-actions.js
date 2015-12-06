import alt from '../alt';
import transactionApi from '../services/transaction-api';
import store from '../stores/store';

class TransactionActions {
  fetchTransactions(accountId) {
    transactionApi.index(accountId);
  }

  storeTransactions(transactions) {
    store.dispatch({
      type: 'SET_TRANSACTIONS',
      transactions: transactions
    });
  }
}

export default new TransactionActions();
