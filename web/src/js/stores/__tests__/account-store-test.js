import alt from '../../alt';
import accountStore from '../account-store';
import accountActions from '../../actions/account-actions';

describe('AccountStore', () => {
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
    it('sets loading to false and fills accounts array', () => {
      let response = {accounts: ['accounts']};
      alt.dispatcher.dispatch({action: accountActions.LIST_ACCOUNTS, data: response});

      expect(accountStore.getState().accounts).toEqual(['accounts']);
      expect(accountStore.getState().loading).toEqual(false);    
    });

    it('sets groups the accounts by account type', () => {
      let accounts = [{name: 'account1', account_type: 'share'}, {name: 'account2', account_type: 'savings'}];
      let response = { accounts: accounts };
      alt.dispatcher.dispatch({action: accountActions.LIST_ACCOUNTS, data: response});

      expect(accountStore.getState().accountGroups.length).toEqual(2);
      let savingsGroup = accountStore.getState().accountGroups[0];
      expect(savingsGroup.code).toEqual('savings');
      expect(savingsGroup.accounts).toEqual([accounts[1]])

      let shareGroup = accountStore.getState().accountGroups[1];
      expect(shareGroup.code).toEqual('share');
      expect(shareGroup.accounts).toEqual([accounts[0]])
    });
  });
});
