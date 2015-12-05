import accountActions from '../actions/account-actions';
import reqwest from 'reqwest';
import accountTransformer from '../transformers/account-transformer';
import store from '../stores/store';


class AccountService {
  index() {
    this._send({
        url: 'http://localhost:3000/accounts',
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'GET',
        success: function (response) {
          accountActions.storeAccounts(response.accounts.map(account => accountTransformer.transformFromApi(account)));
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
          accountActions.storeAccount(accountTransformer.transformFromApi(response.account))
        }
    });
  }

  destroy(accountId) {
    this._send({
        url: 'http://localhost:3000/accounts/' + accountId,
        crossOrigin: true,
        method: 'DELETE',
        success: function (response) {
          let splitResponse = response.responseURL.split( '/' );
          let accountId = splitResponse[splitResponse.length-1];
          accountActions.removeAccount(Number(accountId));
        }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new AccountService();
