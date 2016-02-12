import transactionApi from '../services/transaction-api';
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
}

export default new ImportActions();
