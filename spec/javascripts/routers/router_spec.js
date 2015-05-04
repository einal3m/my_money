describe('MyMoney Router', function() {
  var trigger = {trigger: true};
  var router;

  xdescribe('Initialize', function() {

  });

  xdescribe('Routes', function() {
    beforeEach(function() {
      // This is the trick, right here:
      // The Backbone history code dodges our spies
      // unless we set them up exactly like this:
      Backbone.history.stop(); //stop the router
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'accountIndex'); //spy on our routes, and they won't get called
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'newAccount'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'editAccount'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'showAccount'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'newReconciliation'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'currentAccountTransactions'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'accountTransactions'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'importTransactions'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'reportEodBalance'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'reportCategory'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'reportUnassignedCategory'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'reportIncomeVsExpense'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'reportIncomeExpenseBar'); 
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'categoryIndex'); 

      router = new MyMoney.Routers.AccountsRouter(); // Set up the spies _before_ creating the router
      Backbone.history.start();
    });

    it('empty route routes to accounts index', function(){
      Backbone.history.navigate('', trigger);
      expect(router.accountIndex).toHaveBeenCalled();
    });

    it('accounts route routes to accounts index', function(){
      Backbone.history.navigate('accounts', trigger);
      expect(router.accountIndex).toHaveBeenCalled();
    });

    it('account new route routes to newAccount', function() {
      Backbone.history.navigate('accounts/new', trigger);
      expect(router.newAccount).toHaveBeenCalled();
    });

    it('account edit route routes to editAccount', function() {
      Backbone.history.navigate('accounts/5/edit', trigger);
      expect(router.editAccount).toHaveBeenCalledWith('5');
    });

    it('account show route routes to showAccount', function() {
      Backbone.history.navigate('accounts/6/show', trigger);
      expect(router.showAccount).toHaveBeenCalledWith('6');
    });

    it('reconciliation new route routes to newReconciliation', function() {
      Backbone.history.navigate('accounts/7/reconciliation', trigger);
      expect(router.newReconciliation).toHaveBeenCalledWith('7');
    });

    it('transaction current route routes to currentAccountTransactions', function() {
      Backbone.history.navigate('accounts/current/transactions', trigger);
      expect(router.currentAccountTransactions).toHaveBeenCalled();
    });

    it('transactions route routes to accountTransactions', function() {
      Backbone.history.navigate('accounts/8/transactions', trigger);
      expect(router.accountTransactions).toHaveBeenCalledWith('8');
    });

    it('import route routes to importTransactions', function() {
      Backbone.history.navigate('accounts/9/import', trigger);
      expect(router.importTransactions).toHaveBeenCalledWith('9');
    });

    it('EOD balance report route routes to reportEodBalance', function() {
      Backbone.history.navigate('reports/eod_balance', trigger);
      expect(router.reportEodBalance).toHaveBeenCalled();
    });

    it('Category report route routes to reportUnassignedCategory', function() {
      Backbone.history.navigate('reports/category/', trigger);
      expect(router.reportUnassignedCategory).toHaveBeenCalled();
    });

    it('Category report route routes to reportCategory', function() {
      Backbone.history.navigate('reports/category/5', trigger);
      expect(router.reportCategory).toHaveBeenCalledWith('5');
    });

    it ('income vs expenses report route routes to reportIncomeVsExpense', function() {
      Backbone.history.navigate('reports/income_vs_expense', trigger);
      expect(router.reportIncomeVsExpense).toHaveBeenCalled();
    });

    it ('income expenses bar report route routes to reportIncomeExpenseBar', function() {
      Backbone.history.navigate('reports/income_expense_bar', trigger);
      expect(router.reportIncomeExpenseBar).toHaveBeenCalled();
    });

    it ('category index route routes to categoryIndex', function() {
      Backbone.history.navigate('categories', trigger);
      expect(router.categoryIndex).toHaveBeenCalled();
    });
  });

  describe('route functions', function(){
    beforeEach(function(){
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'fetchData');
      spyOn(MyMoney.Routers.AccountsRouter.prototype, 'accountIndex');
      router = new MyMoney.Routers.AccountsRouter();
      router.currentAccount = 'currentAccount';
      router.accounts = new MyMoney.Collections.AccountsCollection([]);
      router.categoryTypes = 'categoryTypes';
      router.categories = new MyMoney.Collections.Categories([]);
      router.subcategories = new MyMoney.Collections.Subcategories([]);
    });

    it('transactionsIndex', function(){
      var account = 'account';
      spyOn(MyMoney.Views.TransactionsIndexView.prototype, 'initialize').and.callThrough();
      spyOn(router, 'loadView');
      spyOn(router.accounts, 'get').and.returnValue(account);
      router.accountTransactions(13);
      expect(router.accounts.get).toHaveBeenCalledWith(13);
      expect(router.loadView).toHaveBeenCalledWith(jasmine.any(MyMoney.Views.TransactionsIndexView));
      expect(MyMoney.Views.TransactionsIndexView.prototype.initialize).toHaveBeenCalled();
      expect(MyMoney.Views.TransactionsIndexView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
        account: account,
        accounts: router.accounts,
        categoryTypes: 'categoryTypes',
        categories: router.categories,
        subcategories: router.subcategories,
        dateRangeOptions: router.dateRangeOptions,
        currentDateRange: router.currentDateRange
      });
    });

    it('patternIndex', function(){
      spyOn(MyMoney.Views.PatternIndexView.prototype, 'initialize').and.callThrough();
      spyOn(router, 'loadView');
      router.patternIndex();
      expect(router.loadView).toHaveBeenCalledWith(jasmine.any(MyMoney.Views.PatternIndexView));
      expect(MyMoney.Views.PatternIndexView.prototype.initialize).toHaveBeenCalled();
      expect(MyMoney.Views.PatternIndexView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
        account: 'currentAccount',
        accounts: router.accounts,
        categoryTypes: 'categoryTypes',
        categories: router.categories,
        subcategories: router.subcategories
      });
    });

    it('categoryIndex', function(){
      spyOn(MyMoney.Views.CategoryIndexView.prototype, 'initialize').and.callThrough();
      spyOn(router, 'loadView');
      router.categoryIndex();
      expect(router.loadView).toHaveBeenCalledWith(jasmine.any(MyMoney.Views.CategoryIndexView));
      expect(MyMoney.Views.CategoryIndexView.prototype.initialize).toHaveBeenCalled();
      expect(MyMoney.Views.CategoryIndexView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
        categoryTypes: 'categoryTypes',
        categories: router.categories,
        subcategories: router.subcategories
      });
    });
  });
  
  it('loadView', function(){
    spyOn(MyMoney.Routers.AccountsRouter.prototype, 'fetchData');
    spyOn(MyMoney.Routers.AccountsRouter.prototype, 'accountIndex');

    router = new MyMoney.Routers.AccountsRouter();
    spyOn(router, 'removeCurrentView');

    view = jasmine.createSpyObj('view', ['render', 'fetchData', 'el']);
    router.loadView(view);

    expect(router.removeCurrentView).toHaveBeenCalled();
    expect(router.currentView).toEqual(view);
    expect(view.fetchData).toHaveBeenCalled();
    expect(view.render).toHaveBeenCalled();
  });
});