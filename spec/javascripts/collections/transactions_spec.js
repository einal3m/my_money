describe('MyMoney.Collections.Transactions', function(){
  describe('url', function(){
    it('for unreconciled transactions', function(){
      var transactions = new MyMoney.Collections.Transactions([], {
        account_id: 14,
        action: 'reconcile'
      });
      expect(transactions.url()).toEqual('/accounts/14/transactions/unreconciled');
    });
    it('for transactions', function(){
      var transactions = new MyMoney.Collections.Transactions([], {
        account_id: 14
      });
      expect(transactions.url()).toEqual('/accounts/14/transactions');
    });
  });

  it('uploadOFX', function(){
    ajaxSpy.and.returnValue(true);

    var transactions = new MyMoney.Collections.Transactions([], {account_id: 14});
    transactions.uploadOFX('data', 'successFunction');

    expect($.ajax).toHaveBeenCalled();

    var ajaxParams = ajaxSpy.calls.argsFor(0)[0];
    expect(ajaxParams.url).toEqual('/accounts/14/transactions/ofx');
    expect(ajaxParams.type).toEqual('POST');
    expect(ajaxParams.data).toEqual('data');
    expect(ajaxParams.processData).toEqual(false);
    expect(ajaxParams.contentType).toEqual(false);
    expect(ajaxParams.success).toEqual('successFunction');
  });
});
