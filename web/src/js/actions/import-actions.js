import bankStatementApi from '../apis/bank-statement-api';
import transactionApi from '../apis/transaction-api';
import store from '../stores/store';
import { hashHistory } from 'react-router';

class ImportActions {

  uploadOFX(accountId, file) {
    transactionApi.uploadOFX(accountId, file);
  }

  storeOfxTransactions(transactions) {
    store.dispatch({
      type: 'SET_OFX_TRANSACTIONS',
      transactions: transactions
    });

    hashHistory.push('/import');
  }

  importTransactions() {
    let transactions = store.getState().importStore.get('transactions').toJS().filter(transaction => transaction.import);
    let accountId = store.getState().accountStore.get('currentAccount').get('id');
    bankStatementApi.create(accountId, 'myFile.ofx', transactions);
  }

  importComplete() {
    store.dispatch({
      type: 'SET_OFX_TRANSACTIONS',
      transactions: []
    });

    hashHistory.push('/transactions');
  }
}

export default new ImportActions();
