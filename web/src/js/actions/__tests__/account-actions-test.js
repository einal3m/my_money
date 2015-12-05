import accountActions from '../account-actions';
import accountApi from '../../services/account-api';
import store from '../../stores/store';

describe('AccountActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('fetchAccounts', () => {
    it('retrieves a list of accounts', () => {
      spyOn(accountApi, 'index');
      accountActions.fetchAccounts();
      expect(accountApi.index).toHaveBeenCalled();
    });
  });

  describe('storeAccounts', () => {
    it('it dispatches accounts to the store', () => {
      accountActions.storeAccounts(['account']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_ACCOUNTS',
        accounts: ['account']
      });
    });
  });

  describe('createAccount', () => {
    it('calls the account service to create the account', () => {
      spyOn(accountApi, 'create');
      accountActions.createAccount('account');
      expect(accountApi.create).toHaveBeenCalledWith('account');
    });
  });

  describe('storeAccount', () => {
    it('dispatches the account to the store', () => {
      accountActions.storeAccount('account');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'ADD_ACCOUNT',
        account: 'account'
      });
    });
  });

  describe('deleteAccount', () => {
    it('calls the account service to delete the account', () => {
      spyOn(accountApi, 'destroy');
      accountActions.deleteAccount(34);
      expect(accountApi.destroy).toHaveBeenCalledWith(34);
    });
  });

  describe('removeAccount', () => {
    it('dispatches store with account id', () => {
      accountActions.removeAccount(34);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'REMOVE_ACCOUNT',
        id: 34
      });
    });
  });

  describe('setCurrentAccount', () => {
    it('dispatches the id to the store', () => {
      accountActions.setCurrentAccount(45);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CURRENT_ACCOUNT',
        id: 45
      });
    });
  });
});
