import alt from '../alt';
import accountService from '../services/account-service';

class AccountActions {
  fetchAccounts() {
    accountService.list();
    this.dispatch();
  }

  listAccounts(response) {
    this.dispatch(response);
  }

  createAccount(account) {
    accountService.create(account);
    this.dispatch();
  }

  createAccountSuccess(response) {
    this.dispatch(response)
  }
}

export default alt.createActions(AccountActions);
