describe("AccountsIndexView", function(){
  var view, accounts, accountTypes;
  beforeEach(function(){
    accountTypes = new MyMoney.Collections.AccountTypes([
      {id: 1, name: 'Account Type 1'},
      {id: 2, name: 'Account Type 2'},
      {id: 3, name: 'Account Type 3'}
    ]);
    accounts = new MyMoney.Collections.AccountsCollection([
      {id: 3, name: 'Account A', account_type_id: 1},
      {id: 4, name: 'Account B', account_type_id: 1},
      {id: 5, name: 'Account C', account_type_id: 3},
      {id: 6, name: 'Account D', account_type_id: 1}
    ]);

    view = new MyMoney.Views.AccountsIndexView({
      collection: accounts,
      accountTypes: accountTypes
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.collection).toEqual(accounts);
    expect(view.accountTypes).toEqual(accountTypes);
  });

  describe('fetchData', function(){
    it('gets account data', function(){
      spyOn(MyMoney.Collections.AccountsCollection.prototype, 'initialize').and.callThrough();
      spyOn(MyMoney.Collections.AccountsCollection.prototype, 'fetch');

      view.fetchData();

      expect(MyMoney.Collections.AccountsCollection.prototype.initialize).toHaveBeenCalledWith([])
      expect(MyMoney.Collections.AccountsCollection.prototype.fetch).toHaveBeenCalled();
    });
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays the accounts index page", function(){
      expect(view.$('h1')).toContainText('my accounts');
    });

    it("displays tables for each account type", function(){
      expect(view.$('.panel-heading')[0]).toContainText('Type 1');
      expect(view.$('.panel-heading')[1]).toContainText('Type 3');
    });

    it("creates an accountTypeTableView for each account type", function(){
      spyOn(MyMoney.Views.AccountTypeTableView.prototype, 'initialize').and.callThrough();
      view.render();

      expect(MyMoney.Views.AccountTypeTableView.prototype.initialize.calls.count()).toEqual(2);
      var argsForType1 = MyMoney.Views.AccountTypeTableView.prototype.initialize.calls.argsFor(0)[0];
      var argsForType2 = MyMoney.Views.AccountTypeTableView.prototype.initialize.calls.argsFor(1)[0];

      expect(argsForType1.collection.length).toEqual(3);
      expect(argsForType2.collection.length).toEqual(1);
    });
  });

  describe('events', function(){
    beforeEach(function(){
      router = jasmine.createSpyObj('router', ['navigate']);
      window.router = router;
      view.render();
    });

    it('click on new redirects to the new page', function(){
      view.$('#new').click();
      expect(window.router.navigate).toHaveBeenCalledWith('accounts/new', {trigger: true});
    });
    // new account
    // account details
    // account transactions
  });
});
