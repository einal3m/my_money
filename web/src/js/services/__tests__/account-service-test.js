
import accountService from '../account-service';

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
    it('makes and ajax request to POST/accounts (savings)', () => {
      let account={
        name: 'myAccount',
        bank: 'myBank',
        accountType: 'savings',
        openingBalance: 300,
        openingBalanceDate: '2015-04-01'
      }

      accountService.create(account);
      
      expect(accountService._send).toHaveBeenCalled();

      let requestParams = accountService._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts');
      expect(requestParams.method).toEqual('POST');

      let requestData = requestParams.data;
      expect(requestData.account.account_type).toEqual('savings');
      expect(requestData.account.name).toEqual('myAccount');
      expect(requestData.account.bank).toEqual('myBank');
      expect(requestData.account.starting_date).toEqual('2015-04-01');
      expect(requestData.account.starting_balance).toEqual(300);      
    });

    it('makes and ajax request to POST/accounts (share)', () => {
      let account={
        accountType: 'share',
        name: 'myAccount',
        ticker: 'myTicker'
      }

      accountService.create(account);
      
      expect(accountService._send).toHaveBeenCalled();

      let requestParams = accountService._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts');
      expect(requestParams.method).toEqual('POST');

      let requestData = requestParams.data;
      expect(requestData.account.account_type).toEqual('share');
      expect(requestData.account.name).toEqual('myAccount');
      expect(requestData.account.ticker).toEqual('myTicker');
    });
  });
});
