import alt from '../../alt';
import accountActions from '../account-actions';
import accountService from '../../services/account-service';

describe('AccountActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(alt.dispatcher, 'dispatch');
  });

  describe('fetchAccounts', () => {
    it('retrieves a list of accounts', () => {
      spyOn(accountService, 'list');
      accountActions.fetchAccounts();
      expect(accountService.list).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalled();
    });
  });

  describe('listAccounts', () => {
    it('just dispatches', () => {
      accountActions.listAccounts('accounts');
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual('accounts');
    });
  });

  describe('createAccount', () => {
    it('calls the account service to create the account', () => {
      spyOn(accountService, 'create');
      accountActions.createAccount('account');
      expect(accountService.create).toHaveBeenCalledWith('account');
      expect(dispatcherSpy).toHaveBeenCalled();
    });
  });

  describe('createAccountSuccess', () => {
    it('just dispatches with account', () => {
      accountActions.createAccountSuccess('accounts');
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual('accounts');
    });
  });

  describe('deleteAccount', () => {
    it('calls the account service to delete the account', () => {
      spyOn(accountService, 'destroy');
      accountActions.deleteAccount(34);
      expect(accountService.destroy).toHaveBeenCalledWith(34);
      expect(dispatcherSpy).toHaveBeenCalled();
    });
  });

  describe('deleteAccountSuccess', () => {
    it('just dispatches with account id', () => {
      accountActions.deleteAccountSuccess(34);
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual(34);
    });
  });

  describe('setCurrentAccount', () => {
    it('dispatches the id to the store', () => {
      accountActions.setCurrentAccount(45);
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual(45);
    });
  });
});
