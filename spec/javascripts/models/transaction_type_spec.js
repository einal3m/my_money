describe('TransactionType', function(){
  var transactionType;
  beforeEach(function(){
    transactionType = new MyMoney.Models.TransactionType({id: 10});
  });

  it('has a URL', function(){
    expect(transactionType.url()).toEqual('transaction_types/10');
  });
});