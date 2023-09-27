import store from "../stores/store";
import apiUtil from "../util/api-util";
import { getAccounts } from "./account-actions";
import {
  transformFromApi,
  transformToApi,
} from "../transformers/reconciliation-transformer";
import {
  GET_RECONCILIATIONS,
  SET_RECONCILIATIONS,
  SAVE_RECONCILIATION,
} from "../actions/action-types";

export function getReconciliations() {
  return Promise.all([getAccounts({ useStore: true })]).then(() =>
    fetchReconciliations()
  );
}

export function fetchReconciliations() {
  store.dispatch({ type: GET_RECONCILIATIONS });
  const accountId = store
    .getState()
    .accountStore.get("currentAccount")
    .get("id");

  return apiUtil.get({
    url: `accounts/${accountId}/reconciliations`,
    onSuccess: (response) => {
      storeReconciliations(
        response.reconciliations.map((reconciliation) =>
          transformFromApi(reconciliation)
        )
      );
    },
  });
}

function storeReconciliations(reconciliations) {
  store.dispatch({ type: SET_RECONCILIATIONS, reconciliations });
}

export function saveReconciliation(reconciliation) {
  store.dispatch({ type: SAVE_RECONCILIATION });
  const accountId = store
    .getState()
    .accountStore.get("currentAccount")
    .get("id");

  if (reconciliation.id) {
    return updateReconciliation(reconciliation, accountId);
  }
  return createReconciliation(reconciliation, accountId);
}

function createReconciliation(reconciliation, accountId) {
  return apiUtil.post({
    url: `accounts/${accountId}/reconciliations`,
    body: { reconciliation: transformToApi(reconciliation) },
  });
}

function updateReconciliation(reconciliation, accountId) {
  return apiUtil.put({
    url: `accounts/${accountId}/reconciliations/${reconciliation.id}`,
    body: { reconciliation: transformToApi(reconciliation) },
  });
}
