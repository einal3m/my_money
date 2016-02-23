import accountActions from '../account-actions';
import accountApi from '../../apis/account-api';
import accountTransformer from '../../transformers/account-transformer';
import store from '../../stores/store';
import apiUtil from '../../util/api-util';

describe('AccountActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('getAccounts', () => {
    it('makes an ajax request to GET/accounts and calls callback on success', () => {
      spyOn(apiUtil, 'get');
      accountActions.getAccounts();
      expect(apiUtil.get).toHaveBeenCalled();

      let getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts');

      spyOn(accountTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      spyOn(accountActions, 'storeAccounts');
      let successCallback = getArgs.onSuccess;
      successCallback({accounts: ['account']});

      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('account');
      expect(accountActions.storeAccounts).toHaveBeenCalledWith(['transformedFromApi']);
    });

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
