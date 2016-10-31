import { fromJS } from 'immutable';
import * as accountActions from '../account-actions';
import accountTransformer from '../../transformers/account-transformer';
import store from '../../stores/store';
import apiUtil from '../../util/api-util';

describe('AccountActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('getAccounts', () => {
    // TODO: figure out how to test promises :)
  });

  describe('fetchAccounts', () => {
    it('makes an ajax request to GET/accounts and calls callback on success', () => {
      spyOn(apiUtil, 'get').and.returnValue(Promise.resolve());
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ loaded: false }) });

      const promise = accountActions.fetchAccounts();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(promise.then).toBeDefined();
      expect(store.dispatch).toHaveBeenCalledWith({ type: accountActions.GET_ACCOUNTS });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts');

      spyOn(accountTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      const successCallback = getArgs.onSuccess;
      successCallback({ accounts: ['account'] });

      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('account');
      expect(store.dispatch).toHaveBeenCalledWith({
        type: accountActions.SET_ACCOUNTS,
        accounts: ['transformedFromApi'],
      });
    });

    it('doesnt call the api if accounts already loaded and useStoredAccounts is true', () => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ loaded: true }) });

      const promise = accountActions.fetchAccounts({ useStore: true });
      expect(apiUtil.get).not.toHaveBeenCalled();

      expect(promise.then).toBeDefined();
    });

    it('does call the api if already loaded and useStoredAccounts is false', () => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ loaded: true }) });

      accountActions.fetchAccounts();

      expect(apiUtil.get).toHaveBeenCalled();
    });
  });

  describe('getAccountTypes', () => {
    it('makes an ajax request to GET/account_types and calls callback on success', () => {
      spyOn(apiUtil, 'get').and.returnValue(Promise.resolve());
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ accountTypesLoaded: false }) });

      const promise = accountActions.getAccountTypes();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(promise.then).toBeDefined();
      expect(store.dispatch).toHaveBeenCalledWith({ type: accountActions.GET_ACCOUNT_TYPES });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('account_types');

      const successCallback = getArgs.onSuccess;
      successCallback({ account_types: ['account_type'] });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: accountActions.SET_ACCOUNT_TYPES,
        accountTypes: ['account_type'],
      });
    });

    it('doesnt call the api if account types already loaded', () => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ accountTypesLoaded: true }) });

      const promise = accountActions.getAccountTypes();
      expect(apiUtil.get).not.toHaveBeenCalled();

      expect(promise.then).toBeDefined();
    });
  });

  describe('saveAccount', () => {
    it('calls the api to create the account if id not present', () => {
      spyOn(apiUtil, 'post');
      spyOn(accountTransformer, 'transformToApi').and.returnValue('transformedAccount');

      accountActions.saveAccount({ name: 'my account' });

      expect(apiUtil.post).toHaveBeenCalled();
      expect(accountTransformer.transformToApi).toHaveBeenCalledWith({ name: 'my account' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: accountActions.SAVE_ACCOUNT });

      const postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('accounts');
      expect(postArgs.body).toEqual({ account: 'transformedAccount' });
      expect(postArgs.onSuccess).toEqual(accountActions.getAccounts);
    });

    it('calls the api to update the account if id is present', () => {
      spyOn(apiUtil, 'put');
      spyOn(accountTransformer, 'transformToApi').and.returnValue('transformedAccount');

      accountActions.saveAccount({ id: 2, name: 'my account' });

      expect(apiUtil.put).toHaveBeenCalled();
      expect(accountTransformer.transformToApi).toHaveBeenCalledWith({ id: 2, name: 'my account' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: accountActions.SAVE_ACCOUNT });

      const putArgs = apiUtil.put.calls.argsFor(0)[0];
      expect(putArgs.url).toEqual('accounts/2');
      expect(putArgs.body).toEqual({ account: 'transformedAccount' });
      expect(putArgs.onSuccess).toEqual(accountActions.getAccounts);
    });
  });

  describe('deleteAccount', () => {
    it('calls the account api to delete the account', () => {
      spyOn(apiUtil, 'delete');

      accountActions.deleteAccount(34);

      expect(apiUtil.delete).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'DELETE_ACCOUNT' });

      const deleteArgs = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('accounts/34');
      expect(deleteArgs.onSuccess).toEqual(accountActions.getAccounts);
    });
  });

  describe('account filter actions', () => {
    it('setCurrentAccount dispatches the id to the store', () => {
      accountActions.setCurrentAccount(45);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: accountActions.SET_CURRENT_ACCOUNT,
        id: 45,
      });
    });

    it('toggleSelectedAccount', () => {
      accountActions.toggleSelectedAccount(45);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: accountActions.TOGGLE_SELECTED_ACCOUNT,
        accountId: 45,
      });
    });
  });
});
