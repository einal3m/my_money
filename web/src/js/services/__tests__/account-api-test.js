import accountApi from '../account-api';
import accountTransformer from '../../transformers/account-transformer';
import accountActions from '../../actions/account-actions';

describe('accountApi', () => {
  beforeEach(function() {
    spyOn(accountApi, '_send');
  });

  describe('index', () => {
    it('makes an ajax request to GET/accounts', () => {
      accountApi.index();

      let requestParams = accountApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts');
      expect(requestParams.method).toEqual('GET');

      spyOn(accountActions, 'storeAccounts');
      spyOn(accountTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      requestParams.success({accounts: ['account']});
      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('account');
      expect(accountActions.storeAccounts).toHaveBeenCalledWith(['transformedFromApi']);
    });
  });

  describe('create', () => {
    it('makes an ajax request to POST/accounts', () => {
      spyOn(accountTransformer, 'transformToApi').and.returnValue('transformedToApi');
      accountApi.create('account');

      expect(accountTransformer.transformToApi).toHaveBeenCalledWith('account');
      expect(accountApi._send).toHaveBeenCalled();

      let requestParams = accountApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts');
      expect(requestParams.method).toEqual('POST');

      let requestData = requestParams.data;
      expect(requestData).toEqual({account: 'transformedToApi'});

      spyOn(accountActions, 'storeAccount');
      spyOn(accountTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      requestParams.success({account: 'account'});
      expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('account');
      expect(accountActions.storeAccount).toHaveBeenCalledWith('transformedFromApi');
    });
  });

  describe('destroy', () => {
    it('makes an ajax request to DELETE/accounts and tells store its succeeded', () => {
      accountApi.destroy(45);

      expect(accountApi._send).toHaveBeenCalled();

      let requestParams = accountApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts/45');
      expect(requestParams.method).toEqual('DELETE');

      spyOn(accountActions, 'removeAccount');
      requestParams.success({responseURL: 'blah/45'});
      expect(accountActions.removeAccount).toHaveBeenCalledWith(45);
    });
  });
});
