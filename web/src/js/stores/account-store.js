import alt from '../alt';
import accountActions from '../actions/account-actions';

class AccountStore {
  constructor() {
    this.state = {
      accountTypes: [
        { id:1, code: 'savings', name:'Savings' },
        { id:2, code: 'share', name: 'Share' }
      ],
      accounts: [],
      accountGroups: [],
      loading: false
    };

    this.bindActions(accountActions);
  }

  onFetchAccounts() {
    this.setState({
      accounts: [],
      accountGroups: [],
      loading: true
    });
  }

  onListAccounts(response) {
    this.setState({
      accounts: response.accounts,
      accountGroups: this._groupedAccounts(response.accounts),
      loading: false
    });
  }

  _groupedAccounts(accounts) {
    return this.state.accountTypes.map((accountType) => {
      let accountGroupAccounts = accounts.filter((account) => {
        return account.account_type === accountType.code;
      });
      return { code: accountType.code, name: accountType.name, accounts: accountGroupAccounts };
    });
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
