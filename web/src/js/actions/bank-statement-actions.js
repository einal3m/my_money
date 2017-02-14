import apiUtil from '../util/api-util';
import store from '../stores/store';
import { getAccounts } from './account-actions';
import bankStatementTransformer from '../transformers/bank-statement-transformer';

export const GET_BANK_STATEMENTS = 'GET_BANK_STATEMENTS';
export function getBankStatements() {
  Promise.all([
    getAccounts({ useStore: true }),
  ]).then(() => fetchBankStatements());
}

export function fetchBankStatements() {
  store.dispatch({ type: GET_BANK_STATEMENTS });

  const accountId = store.getState().accountStore.get('currentAccount').get('id');
  return apiUtil.get({
    url: `accounts/${accountId}/bank_statements`,
    onSuccess: response => storeBankStatements(
      response.bank_statements.map(bankStatement => bankStatementTransformer.transformFromApi(bankStatement))
    ),
  });
}

export const SET_BANK_STATEMENTS = 'SET_BANK_STATEMENTS';
function storeBankStatements(bankStatements) {
  store.dispatch({
    type: SET_BANK_STATEMENTS,
    bankStatements,
  });
}

export const CONFIRM_DELETE_BANK_STATEMENT = 'CONFIRM_DELETE_BANK_STATEMENT';
export function confirmDeleteBankStatement(bankStatement) {
  store.dispatch({ type: CONFIRM_DELETE_BANK_STATEMENT, bankStatement });
}

export const CANCEL_DELETE_BANK_STATEMENT = 'CANCEL_DELETE_BANK_STATEMENT';
export function cancelDeleteBankStatement() {
  store.dispatch({ type: CANCEL_DELETE_BANK_STATEMENT });
}

export const DELETE_BANK_STATEMENT = 'DELETE_BANK_STATEMENT';
export function deleteBankStatement(bankStatement) {
  store.dispatch({ type: DELETE_BANK_STATEMENT });
  return apiUtil.delete({
    url: `accounts/${bankStatement.accountId}/bank_statements/${bankStatement.id}`,
    onSuccess: fetchBankStatements,
  });
}
