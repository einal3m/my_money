import apiUtil from '../util/api-util';
import { transformToApi, transformFromOfxApi } from '../transformers/transactionTransformer';
import store from '../stores/store';
import {
  UPLOAD_OFX,
  SET_OFX_TRANSACTIONS,
  SAVE_TRANSACTIONS,
  SET_NOTES,
  SET_CATEGORY_ID,
  SET_SUBCATEGORY_ID,
  SET_IMPORT,
} from 'actions/action-types';

export function uploadOFX(accountId, file) {
  store.dispatch({ type: UPLOAD_OFX, fileName: file.name });
  return apiUtil.upload({
    url: `accounts/${accountId}/transactions/import`,
    file,
    onSuccess: response => storeOfxTransactions(
      response.imported_transactions.map(transaction => transformFromOfxApi(transaction))
    ),
  });
}

export function storeOfxTransactions(transactions) {
  store.dispatch({ type: SET_OFX_TRANSACTIONS, transactions });
}

export function importTransactions() {
  store.dispatch({ type: SAVE_TRANSACTIONS });
  const importStore = store.getState().importStore;
  const transactions = importStore.get('transactions').toJS().filter(transaction => transaction.import);
  const fileName = importStore.get('fileName');
  const accountId = store.getState().accountStore.get('currentAccount').get('id');
  const transformedTxns = transactions.map(transaction => transformToApi(transaction));

  return apiUtil.post({
    url: `accounts/${accountId}/bank_statements`,
    body: { account_id: accountId, file_name: fileName, transactions: transformedTxns },
    onSuccess: () => importComplete(),
  });
}

function importComplete() {
  store.dispatch({ type: SET_OFX_TRANSACTIONS, transactions: [] });
}

export function setNotes(index, notes) {
  store.dispatch({
    type: SET_NOTES,
    index,
    notes,
  });
}

export function setCategoryId(index, categoryId) {
  store.dispatch({
    type: SET_CATEGORY_ID,
    index,
    categoryId,
  });
}

export function setSubcategoryId(index, subcategoryId) {
  store.dispatch({
    type: SET_SUBCATEGORY_ID,
    index,
    subcategoryId,
  });
}

export function setImport(index, importFlag) {
  store.dispatch({
    type: SET_IMPORT,
    index,
    import: importFlag,
  });
}
