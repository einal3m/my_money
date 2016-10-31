import apiUtil from '../util/api-util';
import transactionTransformer from '../transformers/transaction-transformer';
import store from '../stores/store';
import { routeToTransactions, routeToImportTransactions } from './routing-actions';

class ImportActions {

  uploadOFX(accountId, file) {
    store.dispatch({ type: 'UPLOAD_OFX', fileName: file.name });
    routeToImportTransactions();
    return apiUtil.upload({
      url: `accounts/${accountId}/transactions/import`,
      file,
      onSuccess: response => this.storeOfxTransactions(
        response.transactions.map(transaction => transactionTransformer.transformFromOfxApi(transaction))
      ),
    });
  }

  storeOfxTransactions(transactions) {
    store.dispatch({ type: 'SET_OFX_TRANSACTIONS', transactions });
  }

  importTransactions() {
    store.dispatch({ type: 'SAVE_TRANSACTIONS' });
    const importStore = store.getState().importStore;
    const transactions = importStore.get('transactions').toJS().filter(transaction => transaction.import);
    const fileName = importStore.get('fileName');
    const accountId = store.getState().accountStore.get('currentAccount').get('id');
    const transformedTxns = transactions.map(transaction => transactionTransformer.transformToApi(transaction));

    return apiUtil.post({
      url: `accounts/${accountId}/bank_statements`,
      body: { account_id: accountId, file_name: fileName, transactions: transformedTxns },
      onSuccess: () => this.importComplete(),
    });
  }

  importComplete() {
    store.dispatch({ type: 'SET_OFX_TRANSACTIONS', transactions: [] });
    routeToTransactions();
  }

  setNotes(index, notes) {
    store.dispatch({
      type: 'SET_NOTES',
      index,
      notes,
    });
  }

  setCategoryId(index, categoryId) {
    store.dispatch({
      type: 'SET_CATEGORY_ID',
      index,
      categoryId,
    });
  }

  setSubcategoryId(index, subcategoryId) {
    store.dispatch({
      type: 'SET_SUBCATEGORY_ID',
      index,
      subcategoryId,
    });
  }

  setImport(index, importFlag) {
    store.dispatch({
      type: 'SET_IMPORT',
      index,
      import: importFlag,
    });
  }
}

export default new ImportActions();
