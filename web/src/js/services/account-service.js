
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
    this._send({
        url: 'http://localhost:3000/accounts',
        crossOrigin: true,
        method: 'POST',
        data: {account: this._transformAccount(account)},
        success: function (response) {
          AccountActions.createAccountSuccess(response)
        }
    });
  }

  _transformAccount(account) {
    if (account.accountType === 'savings') {
      return {
        account_type: account.accountType,
        name: account.name,
        bank: account.bank,
        starting_date: account.openingBalanceDate,
        starting_balance: account.openingBalance
      };
    } else if (account.accountType === 'share') {
      return {
        account_type: account.accountType,
        name: account.name,
        ticker: account.ticker
      };
    }
  }

  _send(params) {
    reqwest(params);
  }
}

export default new AccountService();
