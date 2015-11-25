import alt from '../alt';
import transactionService from '../services/transaction-service';

class TransactionActions {
  fetchTransactions(accountId) {
    transactionService.list(accountId);
    this.dispatch();
  }

  listTransactions(transactions) {
    this.dispatch(transactions);
  }
}

export default alt.createActions(TransactionActions);
