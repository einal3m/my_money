import alt from '../../alt';
import accountStore from '../account-store';
import accountActions from '../../actions/account-actions';

describe('AccountStore', () => {
  let account1, account2, transformedAccount1, transformedAccount2;
  beforeEach(() => {    
    account1 = {id: 1, name: 'account1', account_type: 'share', bank: 'bank1', starting_date: '2014-09-01', starting_balance: 100, current_balance: 3100};
    account2 = {id: 2, name: 'account2', account_type: 'savings', bank: 'bank2', starting_date: '2014-09-02', starting_balance: 200, current_balance: 3200};

    transformedAccount1 = {id: 1, name: 'account1', accountType: 'share', bank: 'bank1', openingBalanceDate: '2014-09-01', openingBalance: 100, currentBalance: 3100};
    transformedAccount2 = {id: 2, name: 'account2', accountType: 'savings', bank: 'bank2', openingBalanceDate: '2014-09-02', openingBalance: 200, currentBalance: 3200};
  });

  afterEach(() => {
    alt.recycle();
  });

  it('has a default state', () => {
    expect(accountStore.getState().accounts).toEqual([]);
    expect(accountStore.getState().accountGroups).toEqual([]);
    expect(accountStore.getState().loading).toEqual(false);    
  });

  it('has defined account types', () => {
    expect(accountStore.getState().accountTypes[0].code).toEqual('savings');
    expect(accountStore.getState().accountTypes[1].code).toEqual('share');
  });

  describe('onFetchAccounts', () => {
    it('sets loading to true and resets accounts array', () => {
      alt.dispatcher.dispatch({action: accountActions.FETCH_ACCOUNTS});

      expect(accountStore.getState().accounts).toEqual([]);
      expect(accountStore.getState().loading).toEqual(true);    
      expect(accountStore.getState().accountGroups).toEqual([]);
    });
  });

  describe('onListAccounts', () => {
    let accounts;
    beforeEach(() => {
      accounts = [account1, account2];
    });

    it('sets loading to false and fills accounts array with transformed accounts', () => {
      let response = { accounts: accounts };
      alt.dispatcher.dispatch({action: accountActions.LIST_ACCOUNTS, data: response});

      expect(accountStore.getState().accounts[0]).toEqual(transformedAccount1);
      expect(accountStore.getState().accounts[1]).toEqual(transformedAccount2);
      expect(accountStore.getState().loading).toEqual(false);    
    });

    it('sets groups the accounts by account type', () => {
      let response = { accounts: accounts };
      alt.dispatcher.dispatch({action: accountActions.LIST_ACCOUNTS, data: response});

      expect(accountStore.getState().accountGroups.length).toEqual(2);
      let savingsGroup = accountStore.getState().accountGroups[0];
      expect(savingsGroup.code).toEqual('savings');
      expect(savingsGroup.accounts).toEqual([accountStore.getState().accounts[1]])

      let shareGroup = accountStore.getState().accountGroups[1];
      expect(shareGroup.code).toEqual('share');
      expect(shareGroup.accounts).toEqual([accountStore.getState().accounts[0]])
    });
  });

  describe('onCreateAccountSuccess', () => {
    it('adds the account to the accounts array and the accountGroups', () => {
      alt.dispatcher.dispatch({action: accountActions.CREATE_ACCOUNT_SUCCESS, data: transformedAccount1});
      expect(accountStore.getState().accounts).toEqual([transformedAccount1]);
      expect(accountStore.getState().accountGroups[1].accounts).toEqual([transformedAccount1]);

      alt.dispatcher.dispatch({action: accountActions.CREATE_ACCOUNT_SUCCESS, data: transformedAccount2});
      expect(accountStore.getState().accounts).toEqual([transformedAccount1, transformedAccount2]);
      expect(accountStore.getState().accountGroups[1].accounts).toEqual([transformedAccount1]);
      expect(accountStore.getState().accountGroups[0].accounts).toEqual([transformedAccount2]);
    });
  });
});
