describe('AccountTypes', function(){
  it('url', function(){
    var accountTypes = new MyMoney.Collections.AccountTypes([]);
    expect(accountTypes.url).toEqual('/account_types');
  });
});
