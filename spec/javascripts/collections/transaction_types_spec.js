describe('TransactionTypes', function(){
  it('url', function(){
    var transactionTypes = new MyMoney.Collections.TransactionTypes([]);
    expect(transactionTypes.url).toEqual('/transaction_types');
  });
});
