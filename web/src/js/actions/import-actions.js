import apiUtil from '../util/api-util';
import transactionTransformer from '../transformers/transaction-transformer';
import store from '../stores/store';
import { hashHistory } from 'react-router';

class ImportActions {

  uploadOFX(accountId, file) {
    store.dispatch({ type: 'UPLOAD_OFX', fileName: file.name });
    hashHistory.push('/import');
    return apiUtil.upload({
      url: `accounts/${accountId}/transactions/ofx`,
      file: file,
      onSuccess: response => this.storeOfxTransactions(
        response.transactions.map(transaction => transactionTransformer.transformFromOfxApi(transaction))
      )
    });
  }

  storeOfxTransactions(transactions) {
    store.dispatch({ type: 'SET_OFX_TRANSACTIONS', transactions: transactions });
  }

  importTransactions() {
    store.dispatch({ type: 'SAVE_TRANSACTIONS' });
    let importStore = store.getState().importStore;
    let transactions = importStore.get('transactions').toJS().filter(transaction => transaction.import);
    let fileName = importStore.get('fileName');
    let accountId = store.getState().accountStore.get('currentAccount').get('id');
    let transformedTxns = transactions.map(transaction => transactionTransformer.transformToApi(transaction));

    return apiUtil.post({
      url: 'accounts/' + accountId + '/bank_statements',
      body: {account_id: accountId, file_name: fileName, transactions: transformedTxns},
      onSuccess: () => this.importComplete()
    });
  }

  importComplete() {
    store.dispatch({ type: 'SET_OFX_TRANSACTIONS', transactions: [] });
    hashHistory.push('/transactions');
  }
}

export default new ImportActions();
