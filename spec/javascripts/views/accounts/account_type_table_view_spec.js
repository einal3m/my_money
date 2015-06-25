describe("MyMoney.Views.AccountTypeTableView", function(){
  var view, accounts, filteredAccounts, accountType;
  beforeEach(function(){
    accountType = new MyMoney.Models.AccountType({id: 2, code: 'share', name: 'Account Type 2'});
    filteredAccounts = new MyMoney.Collections.Accounts([
      {id: 5, name: 'Account C', account_type: 'share'}
    ]);
    accounts = new MyMoney.Collections.Accounts([
      {id: 3, name: 'Account A', account_type: 'savings'},
      {id: 4, name: 'Account B', account_type: 'savings'},
      {id: 5, name: 'Account C', account_type: 'share'},
      {id: 6, name: 'Account D', account_type: 'savings'}
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
