import apiUtil from '../util/api-util';
import transactionTransformer from '../transformers/transaction-transformer';
import store from '../stores/store';

export const UPLOAD_OFX = 'UPLOAD_OFX';
export function uploadOFX(accountId, file) {
  store.dispatch({ type: UPLOAD_OFX, fileName: file.name });
  return apiUtil.upload({
    url: `accounts/${accountId}/transactions/import`,
    file,
    onSuccess: response => storeOfxTransactions(
      response.imported_transactions.map(transaction => transactionTransformer.transformFromOfxApi(transaction))
    ),
  });
}

export const SET_OFX_TRANSACTIONS = 'SET_OFX_TRANSACTIONS';
export function storeOfxTransactions(transactions) {
  store.dispatch({ type: SET_OFX_TRANSACTIONS, transactions });
}

export const SAVE_TRANSACTIONS = 'SAVE_TRANSACTIONS';
export function importTransactions() {
  store.dispatch({ type: SAVE_TRANSACTIONS });
  const importStore = store.getState().importStore;
  const transactions = importStore.get('transactions').toJS().filter(transaction => transaction.import);
  const fileName = importStore.get('fileName');
  const accountId = store.getState().accountStore.get('currentAccount').get('id');
  const transformedTxns = transactions.map(transaction => transactionTransformer.transformToApi(transaction));

  return apiUtil.post({
    url: `accounts/${accountId}/bank_statements`,
    body: { account_id: accountId, file_name: fileName, transactions: transformedTxns },
    onSuccess: () => importComplete(),
  });
}

function importComplete() {
  store.dispatch({ type: SET_OFX_TRANSACTIONS, transactions: [] });
}

export const SET_NOTES = 'SET_NOTES';
export function setNotes(index, notes) {
  store.dispatch({
    type: SET_NOTES,
    index,
    notes,
  });
}

export const SET_CATEGORY_ID = 'SET_CATEGORY_ID';
export function setCategoryId(index, categoryId) {
  store.dispatch({
    type: SET_CATEGORY_ID,
    index,
    categoryId,
  });
}

export const SET_SUBCATEGORY_ID = 'SET_SUBCATEGORY_ID';
export function setSubcategoryId(index, subcategoryId) {
  store.dispatch({
    type: SET_SUBCATEGORY_ID,
    index,
    subcategoryId,
  });
}

export const SET_IMPORT = 'SET_IMPORT';
export function setImport(index, importFlag) {
  store.dispatch({
    type: SET_IMPORT,
    index,
    import: importFlag,
  });
}
