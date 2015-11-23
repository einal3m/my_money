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
    });
  });

  describe('create', () => {
    it('makes and ajax request to POST/accounts', () => {
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
      requestParams.success('response');
      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('response');
      expect(accountActions.createAccountSuccess).toHaveBeenCalledWith('transformedFromApi');
    });
  });
});
