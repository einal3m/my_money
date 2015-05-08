describe('Accounts', function(){
  it('url', function(){
    var accounts = new MyMoney.Collections.Accounts([]);
    expect(accounts.url).toEqual('/accounts');
  });

  it('findByAccountType', function(){
    var accountType = new MyMoney.Models.AccountType({id: 1, name: 'Account Type 1'});
    var accounts = new MyMoney.Collections.Accounts([
      {id: 3, name: 'Hello', account_type_id: 1},
      {id: 5, name: 'Not', account_type_id: 2},
      {id: 6, name: 'GoodBye', account_type_id: 1}
    ]);

    filteredAccounts = accounts.findByAccountType(accountType);
    expect(filteredAccounts.length).toEqual(2);
    expect(filteredAccounts.at(0).get('name')).toEqual('Hello');    
    expect(filteredAccounts.at(1).get('name')).toEqual('GoodBye');    
  });
});
