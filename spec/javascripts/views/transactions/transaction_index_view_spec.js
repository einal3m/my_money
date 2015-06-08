describe("TransactionIndexView", function(){
  var view, account, accounts, categories, subcategories, categoryTypes, transactions, transactionTypes;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      account_type_id: 1,
      name: 'My Account'
    });

    accounts = new MyMoney.Collections.Accounts([account]);
    categoryTypes = new MyMoney.Collections.CategoryTypes([]);
    categories = new MyMoney.Collections.Categories([]);
    subcategories = new MyMoney.Collections.Subcategories([]);
    transactionTypes = new MyMoney.Collections.TransactionTypes([]);
    currentDateRange = new MyMoney.Models.DateRangeOption({
      id: 1,
      name: 'Test Date Range',
      from_date: '1-Jan-2015',
      to_date: '31-Jan-2015'
    });
    dateRangeOptions = new MyMoney.Collections.DateRangeOptions([currentDateRange]);
    
    transaction = new MyMoney.Models.Transaction({
      id: 7,
      account_id: 13,
      date: '10-Jan-2015',
      amount: 500,
      memo: 'This is a memo',
      notes: 'This is a note',
      category_id: null,
      subcategory_id: null,
      balance: 4000,
      reconciliation_id: 4
    });
    transactions = new MyMoney.Collections.Transactions([transaction]);

    view = new MyMoney.Views.TransactionsIndexView({
      account: account,
      accounts: accounts,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories,
      dateRangeOptions: dateRangeOptions,
      currentDateRange: currentDateRange,
      transactionTypes: transactionTypes
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.account).toEqual(account);
    expect(view.accounts).toEqual(accounts);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.dateRangeOptions).toEqual(dateRangeOptions);
    expect(view.currentDateRange).toEqual(currentDateRange);
    expect(view.transactionTypes).toEqual(transactionTypes);
    expect(view.collection).not.toBeDefined();
  });

  describe('fetchData', function(){
    it('gets transaction data for account', function(){
      spyOn(MyMoney.Collections.Transactions.prototype, 'initialize').and.callThrough();
      spyOn(MyMoney.Collections.Transactions.prototype, 'fetch');

      view.fetchData();

      expect(MyMoney.Collections.Transactions.prototype.initialize).toHaveBeenCalledWith([], {account_id: 13})
      expect(MyMoney.Collections.Transactions.prototype.fetch).toHaveBeenCalled();
    });
  });

  describe("render", function(){
    beforeEach(function(){
      view.collection = transactions;
      view.render();
    });

    it("displays the transaction index page", function(){
      expect(view.$('h1')).toContainText('my transactions');
    });

    it("displays an account filter", function(){
      expect(view.el).toContainElement('#account_filter');
      expect(view.$('#account_filter').find('#account_id').val()).toEqual(account.id.toString());
    });

    it("displays a date filter", function(){
      expect(view.el).toContainElement('#date_range_option_id');
      expect(view.$('#date_filter').find('#from_date').val()).toEqual('1-Jan-2015');
      expect(view.$('#date_filter').find('#to_date').val()).toEqual('31-Jan-2015');
    });

    it("displays a table", function(){
      expect(view.el).toContainElement('table');
      expect(view.$('tbody tr').length).toEqual(1);
    });
  });

  describe("click events", function(){
    it("filter search", function(){
      view.collection = transactions;
      view.render();
      router = jasmine.createSpyObj('router', ['setCurrentAccount', 'setCurrentDateRange']);
      window.router = router;

      view.$('#search').click();

      expect(router.setCurrentAccount).toHaveBeenCalledWith(account);
      expect(router.setCurrentDateRange).toHaveBeenCalledWith(currentDateRange);
      expect(window.location.hash).toEqual('#accounts/current/transactions')
    });

    it("import transactions", function(){
      view.collection = transactions;
      view.render();
      router = jasmine.createSpyObj('router', ['navigate']);
      window.router = router;

      view.$('#import').click();
      expect(window.router.navigate).toHaveBeenCalledWith('accounts/13/import', { trigger: true})
    });
  });
});