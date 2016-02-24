import store from '../stores/store';
import apiUtil from '../util/api-util';
import accountTransformer from '../transformers/account-transformer';

export class AccountActions {

  getAccounts() {
    let accountsLoaded = store.getState().accountStore.get('loaded');

    if (accountsLoaded) {
      return Promise.resolve();
    } else {
      store.dispatch({type: 'GET_ACCOUNTS'});
      return apiUtil.get({
        url: 'accounts',
        onSuccess: response => this.storeAccounts(response.accounts.map(account => accountTransformer.transformFromApi(account)))
      });
    }
  }

  storeAccounts(accounts) {
    store.dispatch({ type: 'SET_ACCOUNTS', accounts: accounts });
  }

  createAccount(account) {
    store.dispatch({ type: 'SAVE_ACCOUNT' });
    return apiUtil.post({
      url: 'accounts',
      body: {account: accountTransformer.transformToApi(account)},
      onSuccess: response => this.storeAccount(accountTransformer.transformFromApi(response.account))
    });
  }

  storeAccount(account) {
    store.dispatch({ type: 'ADD_ACCOUNT', account: account });
  }

  deleteAccount(id) {
    store.dispatch({ type: 'DELETE_ACCOUNT' });
    return apiUtil.delete({
      url: 'accounts/' + id,
      onSuccess: () => this.removeAccount(id)
    });
  }

  removeAccount(id) {
    store.dispatch({ type: 'REMOVE_ACCOUNT', id: id });
  }

  setCurrentAccount(id) {
    store.dispatch({ type: 'SET_CURRENT_ACCOUNT', id: id });
  }
}

export default new AccountActions();
