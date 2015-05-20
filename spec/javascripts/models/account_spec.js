describe('AccountModel', function(){
  var account;
  beforeEach(function(){
    account = new MyMoney.Models.Account({id: 10});
  });

  it('has a name', function(){
    expect(account.name).toEqual('account');
  })

  it('has a URL', function(){
    expect(account.url()).toEqual('accounts/10');
  });

  describe('validation', function(){
    it ('requires an account type ', function(){
      expect(account.preValidate('account_type_id', null)).toEqual('Account type is required');
      expect(account.preValidate('account_type_id',  6)).toEqual('');
    });

    it ('requires a name', function(){
      expect(account.preValidate('name', '   ')).toEqual('Name is required');
      expect(account.preValidate('name', 'Account Name')).toEqual('');
    });

    describe('savings account', function(){
      beforeEach(function(){
        account.set({account_type_id: 1});
      });
      it ('requires a starting balance', function(){
        expect(account.preValidate('starting_balance', null)).toEqual('Opening balance is required');
        expect(account.preValidate('starting_balance', 'hello')).toEqual('Opening balance must be a number');
        expect(account.preValidate('starting_balance', 20)).toEqual('');
      });

      it ('requires a starting date', function(){
        expect(account.preValidate('starting_date', null)).toEqual('Opening balance date is required');
        expect(account.preValidate('starting_date', '1-May-2015')).toEqual('');
      });

      it('ticker is not required', function(){
        expect(account.preValidate('ticker', null)).toEqual('');
      });
    });
    describe('share account', function(){
      beforeEach(function(){
        account.set({account_type_id: 2});
      });
      it ('requires a ticker', function(){
        expect(account.preValidate('ticker', null)).toEqual('Ticker is required');
        expect(account.preValidate('ticker', 'TCK')).toEqual('');
      });
  
      it('starting_date and starting_balance is not required', function(){
        expect(account.preValidate('starting_balance', null)).toEqual('');
        expect(account.preValidate('starting_date', null)).toEqual('');
      });
    });

    it('bank is optional', function(){
      expect(account.preValidate('bank', null)).toEqual('');
    });
  });
});