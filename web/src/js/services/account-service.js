
import AccountActions from '../actions/account-actions';
import reqwest from 'reqwest';

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
    let data = {
      name: account.name,
      bank: account.bank,
      account_type: 'savings',
      starting_date: account.openingBalanceDate,
      starting_balance: account.openingBalance
    };

    this._send({
        url: 'http://localhost:3000/accounts',
        crossOrigin: true,
        method: 'POST',
        data: {account: data},
        success: function (response) {
          AccountActions.createAccountSuccess(response)
        }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new AccountService();
