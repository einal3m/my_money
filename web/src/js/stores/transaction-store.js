import alt from '../alt';
import transactionActions from '../actions/transaction-actions';

class TransactionStore {
  constructor() {
    this.state = {
      transactions: [],
      loading: false
    };

    this.bindActions(transactionActions);
  }

  onFetchTransactions() {
    this.setState({
      transactions: [],
      loading: true
    });
  }

  onReceiveTransactions(transactions) {
    this.setState({
      transactions: transactions,
      loading: false
    });
  }
}

export default alt.createStore(TransactionStore, 'TransactionStore');
