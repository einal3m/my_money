describe('Transaction', function(){
  var transaction;
  beforeEach(function(){
    transaction = new MyMoney.Models.Transaction({id: 10, account_id: 14});
  });

  it('has a name', function(){
    expect(transaction.name).toEqual('transaction');
  })

  it('has a URL', function(){
    expect(transaction.url()).toEqual('accounts/14/transactions/10');
  });

  describe('validation', function(){
    it ('requires a date', function(){
      expect(transaction.preValidate('date', '   ')).toEqual('Date is required');
      expect(transaction.preValidate('date', '01-Jul-2015')).toEqual('');
    });

    it ('requires an amount', function(){
      expect(transaction.preValidate('amount', '   ')).toEqual('Amount is required');
      expect(transaction.preValidate('amount', 60)).toEqual('');
    });

    it ('requires an account_id', function(){
      expect(transaction.preValidate('account_id', null)).toEqual('Account is required');
      expect(transaction.preValidate('account_id', 2)).toEqual('');
    });
  });
});