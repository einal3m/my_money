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

  it('amount defaults to zero', function(){
    expect(transaction.get('amount')).toEqual(0);
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

  describe('transaction type', function(){
    it('bank transaction', function(){
      transaction.set('transaction_type', 'bank_transaction');
      expect(transaction.isBankTransaction()).toEqual(true);
    });

    it('share sale', function(){
      transaction.set('transaction_type', 'share_sale');
      expect(transaction.isShareSale()).toEqual(true);
    });

    it('dividend', function(){
      transaction.set('transaction_type', 'dividend');
      expect(transaction.isDividend()).toEqual(true);
    });

    it('unit price update', function(){
      transaction.set('transaction_type', 'unit_price_update');
      expect(transaction.isUnitPriceUpdate()).toEqual(true);
    });

    it('share purchase', function(){
      transaction.set('transaction_type', 'share_purchase');
      expect(transaction.isSharePurchase()).toEqual(true);
    });
  });
});