import AccountActions from '../actions/account-actions';
import reqwest from 'reqwest';
import accountTransformer from '../transformers/account-transformer';

class AccountService {
  list() {
    this._send({
        url: 'http://localhost:3000/accounts',
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'GET',
        success: function (response) {
          AccountActions.listAccounts(response)
        }
    });
  }

  create(account) {
    this._send({
        url: 'http://localhost:3000/accounts',
        crossOrigin: true,
        method: 'POST',
        data: {account: accountTransformer.transformToApi(account)},
        success: function (response) {
          AccountActions.createAccountSuccess(accountTransformer.transformFromApi(response))
        }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new AccountService();
