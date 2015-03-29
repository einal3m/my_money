describe('MyMoney Router', function() {
  var trigger = {trigger: true};
  var router

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
    spyOn(MyMoney.Routers.AccountsRouter.prototype, 'reportIncomeVsExpense'); 
    spyOn(MyMoney.Routers.AccountsRouter.prototype, 'reportIncomeExpenseBar'); 

    router = new MyMoney.Routers.AccountsRouter(); // Set up the spies _before_ creating the router
    Backbone.history.start();
  });

  describe('Initialize', function() {

  });

  describe('Routes', function() {
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

    it ('income vs expenses report route routes to reportIncomeVsExpense', function() {
      Backbone.history.navigate('reports/income_vs_expense', trigger);
      expect(router.reportIncomeVsExpense).toHaveBeenCalled();
    });

    it ('income expenses bar report route routes to reportIncomeExpenseBar', function() {
      Backbone.history.navigate('reports/income_expense_bar', trigger);
      expect(router.reportIncomeExpenseBar).toHaveBeenCalled();
    });
  });

});