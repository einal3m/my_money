
import accountService from '../account-service';

describe('AccountService', () => {
  beforeEach(function() {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  describe('list', () => {
    it('makes an ajax request to GET/accounts', () => {
      accountService.list();
      let ajaxCall = jasmine.Ajax.requests.mostRecent();
      
      expect(ajaxCall.method).toEqual('GET');
      expect(ajaxCall.url).toEqual('http://localhost:3000/accounts');
    });
  });
});
