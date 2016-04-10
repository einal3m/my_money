import accountActions from '../account-actions';
import accountTransformer from '../../transformers/account-transformer';
import store from '../../stores/store';
import apiUtil from '../../util/api-util';
import { fromJS } from 'immutable';

describe('AccountActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('getAccounts', () => {
    it('makes an ajax request to GET/accounts and calls callback on success', () => {
      spyOn(apiUtil, 'get').and.returnValue(Promise.resolve());
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({loaded: false}) });
      let promise = accountActions.getAccounts();
      expect(apiUtil.get).toHaveBeenCalled();
      expect(promise.then).toBeDefined();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_ACCOUNTS' });

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
    it('calls the api to create the account', () => {
      spyOn(apiUtil, 'post');
      spyOn(accountTransformer, 'transformToApi').and.returnValue('transformedAccount');
      accountActions.createAccount('account');
      expect(apiUtil.post).toHaveBeenCalled();
      expect(accountTransformer.transformToApi).toHaveBeenCalledWith('account');
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'SAVE_ACCOUNT' });

      let postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('accounts');
      expect(postArgs.body).toEqual({account: 'transformedAccount'});

      spyOn(accountTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      spyOn(accountActions, 'storeAccount');
      let successCallback = postArgs.onSuccess;
      successCallback({account: 'account'});

      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('account');
      expect(accountActions.storeAccount).toHaveBeenCalledWith('transformedFromApi');
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
    it('calls the account api to delete the account', () => {
      spyOn(apiUtil, 'delete');
      accountActions.deleteAccount(34);
      expect(apiUtil.delete).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'DELETE_ACCOUNT' });

      let deleteArgs = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('accounts/34');

      spyOn(accountActions, 'removeAccount');
      let successCallback = deleteArgs.onSuccess;
      successCallback();
      expect(accountActions.removeAccount).toHaveBeenCalled();
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

  describe('account filter actions', () => {
    it('setCurrentAccount dispatches the id to the store', () => {
      accountActions.setCurrentAccount(45);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CURRENT_ACCOUNT',
        id: 45
      });
    });

    it('toggleSelectedAccount', () => {
      accountActions.toggleSelectedAccount(45);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'TOGGLE_SELECTED_ACCOUNT',
        accountId: 45
      });
    });
  });
});
