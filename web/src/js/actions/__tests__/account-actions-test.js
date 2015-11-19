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
    })
  });
});
