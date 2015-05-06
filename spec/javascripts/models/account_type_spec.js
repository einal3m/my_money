describe('AccountType', function(){
  var accountType;
  beforeEach(function(){
    accountType = new MyMoney.Models.AccountType({id: 10});
  });

  it('has a URL', function(){
    expect(accountType.url()).toEqual('account_types/10');
  });
});