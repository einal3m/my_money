import apiUtil from "../util/api-util";
import store from "../stores/store";
import transactionTransformer from "../transformers/transaction-transformer";
import {
  GET_MATCHING_TRANSACTIONS,
  SET_MATCHING_TRANSACTIONS,
} from "../actions/action-types";

export function getMatchingTransactions(transactionId) {
  const accountId = store
    .getState()
    .accountStore.get("currentAccount")
    .get("id");
  const url = `accounts/${accountId}/transactions/${transactionId}/matching`;

  store.dispatch({ type: GET_MATCHING_TRANSACTIONS });

  return apiUtil.get({
    url,
    onSuccess: (response) =>
      storeMatchingTransactions(
        response.transactions.map((transaction) =>
          transactionTransformer.transformFromApi(transaction)
        )
      ),
  });
}

function storeMatchingTransactions(transactions) {
  store.dispatch({
    type: SET_MATCHING_TRANSACTIONS,
    transactions,
  });
}
