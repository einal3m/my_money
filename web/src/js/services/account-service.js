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
          AccountActions.listAccounts(
            response.accounts.map((account) => {
              return accountTransformer.transformFromApi(account);
            })
          )
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
          AccountActions.createAccountSuccess(accountTransformer.transformFromApi(response.account))
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
          AccountActions.deleteAccountSuccess(Number(accountId));
        }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new AccountService();
