describe('MyMoney.Models.BankStatement', function(){
  var bankStatement;
  beforeEach(function(){
    bankStatement = new MyMoney.Models.BankStatement({id: 10, account_id: 14});
  });

  it('has a URL', function(){
    expect(bankStatement.url()).toEqual('accounts/14/bank_statements/10');
  });
});