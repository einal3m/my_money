describe('Account', function(){
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
    it ('requires a name', function(){
      expect(account.preValidate('name', '   ')).toEqual('Name is required');
      expect(account.preValidate('name', 'Account Name')).toEqual('');
    });

    it ('requires a starting balance', function(){
      expect(account.preValidate('starting_balance', null)).toEqual('Opening balance is required');
      expect(account.preValidate('starting_balance', 2)).toEqual('');
    });

    it ('requires a starting date', function(){
      expect(account.preValidate('starting_date', null)).toEqual('Opening balance date is required');
      expect(account.preValidate('starting_date', 2)).toEqual('');
    });
  });
});