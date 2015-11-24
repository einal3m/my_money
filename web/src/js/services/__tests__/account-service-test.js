import accountService from '../account-service';
import accountTransformer from '../../transformers/account-transformer';
import accountActions from '../../actions/account-actions';

describe('AccountService', () => {
  beforeEach(function() {
    spyOn(accountService, '_send');
  });

  describe('list', () => {
    it('makes an ajax request to GET/accounts', () => {
      accountService.list();

      let requestParams = accountService._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts');
      expect(requestParams.method).toEqual('GET');

      spyOn(accountActions, 'listAccounts');
      spyOn(accountTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      requestParams.success({accounts: ['account']});
      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('account');
      expect(accountActions.listAccounts).toHaveBeenCalledWith(['transformedFromApi']);
    });
  });

  describe('create', () => {
    it('makes an ajax request to POST/accounts', () => {
      spyOn(accountTransformer, 'transformToApi').and.returnValue('transformedToApi');
      accountService.create('account');

      expect(accountTransformer.transformToApi).toHaveBeenCalledWith('account');
      expect(accountService._send).toHaveBeenCalled();

      let requestParams = accountService._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts');
      expect(requestParams.method).toEqual('POST');

      let requestData = requestParams.data;
      expect(requestData).toEqual({account: 'transformedToApi'});

      spyOn(accountActions, 'createAccountSuccess');
      spyOn(accountTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      requestParams.success({account: 'account'});
      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('account');
      expect(accountActions.createAccountSuccess).toHaveBeenCalledWith('transformedFromApi');
    });
  });

  describe('destroy', () => {
    it('makes an ajax request to DELETE/accounts and tells store its succeeded', () => {
      accountService.destroy(45);

      expect(accountService._send).toHaveBeenCalled();

      let requestParams = accountService._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts/45');
      expect(requestParams.method).toEqual('DELETE');

      spyOn(accountActions, 'deleteAccountSuccess');
      requestParams.success({responseURL: 'blah/45'});
      expect(accountActions.deleteAccountSuccess).toHaveBeenCalledWith(45);
    });
  });
});
