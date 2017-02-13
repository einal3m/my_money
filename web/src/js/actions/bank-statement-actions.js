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
