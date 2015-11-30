import alt from '../../alt';
import accountStore from '../account-store';
import accountActions from '../../actions/account-actions';

describe('AccountStore', () => {
  let account1, account2;
  beforeEach(() => {    
    account1 = {id: 11, name: 'account1', accountType: 'share'};
    account2 = {id: 12, name: 'account2', accountType: 'savings'};
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

  describe('loaded', () => {
    it('is true if accountGroups are not empty and store is not loading', () => {
      expect(accountStore.getState().loaded).toEqual(false);

      alt.dispatcher.dispatch({action: accountActions.FETCH_ACCOUNTS});
      expect(accountStore.getState().loaded).toEqual(false);

      alt.dispatcher.dispatch({action: accountActions.LIST_ACCOUNTS, data: [account1, account2]});
      expect(accountStore.getState().loaded).toEqual(true);
    });
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
      alt.dispatcher.dispatch({action: accountActions.LIST_ACCOUNTS, data: accounts});

      expect(accountStore.getState().accounts[0]).toEqual(account1);
      expect(accountStore.getState().accounts[1]).toEqual(account2);
      expect(accountStore.getState().currentAccount).toEqual(account1);
      expect(accountStore.getState().loading).toEqual(false);
    });

    it('sets groups the accounts by account type', () => {
      alt.dispatcher.dispatch({action: accountActions.LIST_ACCOUNTS, data: accounts});

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
      alt.dispatcher.dispatch({action: accountActions.CREATE_ACCOUNT_SUCCESS, data: account1});
      expect(accountStore.getState().accounts).toEqual([account1]);
      expect(accountStore.getState().accountGroups[1].accounts).toEqual([account1]);

      alt.dispatcher.dispatch({action: accountActions.CREATE_ACCOUNT_SUCCESS, data: account2});
      expect(accountStore.getState().accounts).toEqual([account1, account2]);
      expect(accountStore.getState().accountGroups[1].accounts).toEqual([account1]);
      expect(accountStore.getState().accountGroups[0].accounts).toEqual([account2]);
    });
  });

  describe('onDeleteAccountSuccess', () => {
    it('removes the account from the accounts array and the accountGroups', () => {
      alt.dispatcher.dispatch({action: accountActions.CREATE_ACCOUNT_SUCCESS, data: account1});
      alt.dispatcher.dispatch({action: accountActions.CREATE_ACCOUNT_SUCCESS, data: account2});

      alt.dispatcher.dispatch({action: accountActions.DELETE_ACCOUNT_SUCCESS, data: 12});
      expect(accountStore.getState().accounts).toEqual([account1]);
      expect(accountStore.getState().accountGroups[0].accounts).toEqual([]);
      expect(accountStore.getState().accountGroups[1].accounts).toEqual([account1]);
    });
  });

  describe('onSetCurrentAccount', () => {
    it('sets the currentAccount based on id', () => {
      alt.dispatcher.dispatch({action: accountActions.CREATE_ACCOUNT_SUCCESS, data: account1});
      alt.dispatcher.dispatch({action: accountActions.CREATE_ACCOUNT_SUCCESS, data: account2});
      expect(accountStore.getState().currentAccount).toEqual(account1);

      alt.dispatcher.dispatch({action: accountActions.SET_CURRENT_ACCOUNT, data: 12});
      expect(accountStore.getState().currentAccount).toEqual(account2);

      alt.dispatcher.dispatch({action: accountActions.DELETE_ACCOUNT_SUCCESS, data: 12});
      expect(accountStore.getState().currentAccount).toEqual(account1);

      alt.dispatcher.dispatch({action: accountActions.DELETE_ACCOUNT_SUCCESS, data: 11});
      expect(accountStore.getState().currentAccount).toBeUndefined();

    });
  });
});
