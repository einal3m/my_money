import apiUtil from '../util/api-util';
import store from '../stores/store';
import transactionTransformer from '../transformers/transaction-transformer';

export const GET_MATCHING_TRANSACTIONS = 'GET_MATCHING_TRANSACTIONS';
export function getMatchingTransactions(transactionId) {
  const accountId = store.getState().accountStore.get('currentAccount').get('id');
  const url = `accounts/${accountId}/transactions/${transactionId}/matching`;

  store.dispatch({ type: GET_MATCHING_TRANSACTIONS });

  return apiUtil.get({
    url,
    onSuccess: response => storeMatchingTransactions(
      response.transactions.map(transaction => transactionTransformer.transformFromApi(transaction))
    ),
  });
}

export const SET_MATCHING_TRANSACTIONS = 'SET_MATCHING_TRANSACTIONS';
function storeMatchingTransactions(transactions) {
  store.dispatch({
    type: SET_MATCHING_TRANSACTIONS,
    transactions,
  });
}
