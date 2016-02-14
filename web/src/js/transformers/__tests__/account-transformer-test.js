import accountTransformer from '../account-transformer';

describe('AccountTransformer', () => {
  describe('transformToApi', () => {
    it('converts savings account to API format', () => {
      let account={
        name: 'myAccount',
        bank: 'myBank',
        accountType: 'savings',
        openingBalance: 300,
        openingBalanceDate: '2015-04-01'
      }

      let transformedAccount = accountTransformer.transformToApi(account);

      expect(transformedAccount.account_type).toEqual('savings');
      expect(transformedAccount.name).toEqual('myAccount');
      expect(transformedAccount.bank).toEqual('myBank');
      expect(transformedAccount.starting_date).toEqual('2015-04-01');
      expect(transformedAccount.starting_balance).toEqual(300);      
    });

    it('converts share account to API format', () => {
      let account={
        accountType: 'share',
        name: 'myAccount',
        ticker: 'myTicker'
      }

      let transformedAccount = accountTransformer.transformToApi(account);

      expect(transformedAccount.account_type).toEqual('share');
      expect(transformedAccount.name).toEqual('myAccount');
      expect(transformedAccount.ticker).toEqual('myTicker');
    });

    it('throws an error for unknown account type', () => {
      expect(function() {accountTransformer.transformToApi({accountType: 'something'})}).toThrow();
    });
  });

  describe('transformFromApi', () => {
    it('converts savings account from API format', () => {
      let account = {
        id: 11,
        account_type: 'savings',
        name: 'myAccount',
        bank: 'myBank',
        starting_balance: 300,
        starting_date: '2015-04-01',
        current_balance: 5000
      }

      let transformedAccount = accountTransformer.transformFromApi(account);

      expect(transformedAccount.id).toEqual(11);
      expect(transformedAccount.accountType).toEqual('savings');
      expect(transformedAccount.name).toEqual('myAccount');
      expect(transformedAccount.bank).toEqual('myBank');
      expect(transformedAccount.openingBalance).toEqual(300);
      expect(transformedAccount.openingBalanceDate).toEqual('2015-04-01');
      expect(transformedAccount.currentBalance).toEqual(5000);
    });

    it('converts share account from API format', () => {
      let account = { 
        id: 11,
        account_type: 'share', 
        name: 'myAccount', 
        ticker: 'myTicker',
        current_balance: 5000
      } 

      let transformedAccount = accountTransformer.transformFromApi(account);

      expect(transformedAccount.id).toEqual(11);
      expect(transformedAccount.accountType).toEqual('share');
      expect(transformedAccount.name).toEqual('myAccount');
      expect(transformedAccount.ticker).toEqual('myTicker');
      expect(transformedAccount.currentBalance).toEqual(5000);
    });

    it('throws an error for unknown account type', () => {
      expect(function() {accountTransformer.transformFromApi({account_type: 'something'});}).toThrow();
    });
  });
});
