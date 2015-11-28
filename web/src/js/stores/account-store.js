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
      loading: false,
      loaded: false
    };

    this.bindActions(accountActions);
  }

  onFetchAccounts() {
    this.setState({
      accounts: [],
      accountGroups: [],
      loading: true,
      loaded: false
    });
  }

  onListAccounts(accounts) {
    this.setState({
      accounts: accounts,
      accountGroups: this._groupedAccounts(accounts),
      loading: false,
      loaded: true
    });
  }

  onCreateAccountSuccess(account) {
    let accounts = this.state.accounts;
    accounts.push(account);
    this.setState({
      accounts: accounts,
      accountGroups: this._groupedAccounts(accounts)
    });
  }

  onDeleteAccountSuccess(accountId) {
    let accounts = this.state.accounts.filter((account) => {
      return account.id !== accountId;
    });
    this.setState({
      accounts: accounts,
      accountGroups: this._groupedAccounts(accounts)
    });
  }

  _groupedAccounts(accounts) {
    return this.state.accountTypes.map((accountType) => {
      let accountGroupAccounts = accounts.filter((account) => {
        return account.accountType === accountType.code;
      });
      return { code: accountType.code, name: accountType.name, accounts: accountGroupAccounts };
    });
  }
}

export default alt.createStore(AccountStore, 'AccountStore');
