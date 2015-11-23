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
    let accounts = response.accounts.map(account => this._transformAccount(account));
    this.setState({
      accounts: accounts,
      accountGroups: this._groupedAccounts(accounts),
      loading: false
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

  _transformAccount(account) {
    return {
      id: account.id,
      accountType: account.account_type,
      name: account.name,
      bank: account.bank,
      openingBalance: account.starting_balance,
      openingBalanceDate: account.starting_date,
      currentBalance: account.current_balance
    };
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
