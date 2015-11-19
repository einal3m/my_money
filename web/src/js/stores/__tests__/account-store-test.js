import alt from '../../alt';
import accountStore from '../account-store';
import accountActions from '../../actions/account-actions';

describe('AccountStore', () => {
  it('has a default state', () => {
    expect(accountStore.getState().accounts).toEqual([]);
    expect(accountStore.getState().loading).toEqual(false);    
  });

  describe('onFetchAccounts', () => {
    it('sets loading to true and resets accounts array', () => {
      alt.dispatcher.dispatch({action: accountActions.FETCH_ACCOUNTS});

      expect(accountStore.getState().accounts).toEqual([]);
      expect(accountStore.getState().loading).toEqual(true);    
    });
  });

  describe('onListAccounts', () => {
    it('sets loading to false and fills accounts array', () => {
      let response = {accounts: ['accounts']};
      alt.dispatcher.dispatch({action: accountActions.LIST_ACCOUNTS, data: response});

      expect(accountStore.getState().accounts).toEqual(['accounts']);
      expect(accountStore.getState().loading).toEqual(false);    
    });
  });
});
