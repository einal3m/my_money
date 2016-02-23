import accountApi from '../apis/account-api';
import store from '../stores/store';
import apiUtil from '../util/api-util';
import accountTransformer from '../transformers/account-transformer';

export class AccountActions {
  fetchAccounts(callback) {
    accountApi.index(callback);
  }

  storeAccounts(accounts) {
    store.dispatch({
      type: 'SET_ACCOUNTS',
      accounts: accounts
    });
  }

  getAccounts() {
    return apiUtil.get({
      url: 'accounts',
      onSuccess: response => this.storeAccounts(response.accounts.map(account => accountTransformer.transformFromApi(account)))
    });
  }

  createAccount(account) {
    accountApi.create(account);
  }

  storeAccount(account) {
    store.dispatch({
      type: 'ADD_ACCOUNT',
      account: account
    });
  }

  removeAccount(id) {
    store.dispatch({
      type: 'REMOVE_ACCOUNT',
      id: id
    });
  }

  deleteAccount(id) {
    accountApi.destroy(id);
  }

  setCurrentAccount(id) {
    store.dispatch({
      type: 'SET_CURRENT_ACCOUNT',
      id: id
    });
  }
}

export default new AccountActions();