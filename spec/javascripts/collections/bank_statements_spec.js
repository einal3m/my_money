describe('MyMoney.Collections.BankStatements', function(){
  it('url', function(){
    var bankStatements = new MyMoney.Collections.BankStatements([], {account_id: 14});
    expect(bankStatements.url()).toEqual('/accounts/14/bank_statements');
  });
});
