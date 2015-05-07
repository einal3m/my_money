describe("AccountTypeTableView", function(){
  var view, accounts, filteredAccounts, accountType;
  beforeEach(function(){
    accountType = new MyMoney.Models.AccountType({id: 2, name: 'Account Type 2'});
    filteredAccounts = new MyMoney.Collections.AccountsCollection([
      {id: 5, name: 'Account C', account_type_id: 2}
    ]);
    accounts = new MyMoney.Collections.AccountsCollection([
      {id: 3, name: 'Account A', account_type_id: 1},
      {id: 4, name: 'Account B', account_type_id: 1},
      {id: 5, name: 'Account C', account_type_id: 2},
      {id: 6, name: 'Account D', account_type_id: 1}
    ]);

    view = new MyMoney.Views.AccountTypeTableView({
      model: accountType,
      collection: filteredAccounts,
      accounts: accounts
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(accountType);
    expect(view.collection).toEqual(filteredAccounts);
    expect(view.accounts).toEqual(accounts);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a panel with table", function(){
      expect(view.el).toContainElement('.panel');
      expect(view.$('.panel-heading')).toContainText('Account Type 2');
      expect(view.$('.panel')).toContainElement('table');
    });

    it ('has rows', function(){
      expect(view.$('tbody tr').length).toEqual(1)
    });
  });
});
