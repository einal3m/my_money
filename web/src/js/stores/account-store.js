import alt from '../alt';
import accountActions from '../actions/account-actions';

class AccountStore {
  constructor() {
    this.state = {
      accounts: [],
      loading: false
    };

    this.bindActions(accountActions);
  }

  onFetchAccounts() {
    this.setState({
      accounts: [],
      loading: true
    });
  }

  onListAccounts(response) {
    this.setState({
      accounts: response.accounts,
      loading: false
    })
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
