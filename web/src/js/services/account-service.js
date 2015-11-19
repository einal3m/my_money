
import AccountActions from '../actions/account-actions';
import reqwest from 'reqwest';

class AccountService {
  list() {
    reqwest({
        url: 'http://localhost:3000/accounts',
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'get',
        success: function (response) {
          AccountActions.listAccounts(response)
        }
    });
  }
}

export default new AccountService();
