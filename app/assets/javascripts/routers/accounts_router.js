MyMoney.Routers.AccountsRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.fetchData();
  },

  fetchData: function(){
    var router = this;
    this.accounts = new MyMoney.Collections.Accounts();
    this.accountTypes = new MyMoney.Collections.AccountTypes();
    this.transactionTypes = new MyMoney.Collections.TransactionTypes();
    this.categoryTypes = new MyMoney.Collections.CategoryTypes();
    this.categories = new MyMoney.Collections.Categories();
    this.subcategories = new MyMoney.Collections.Subcategories();
    this.dateRangeOptions = new MyMoney.Collections.DateRangeOptions();

    $.when(router.accounts.fetch(),
           router.accountTypes.fetch(),
           router.transactionTypes.fetch(),
           router.categories.fetch(),
           router.categoryTypes.fetch(),
           router.subcategories.fetch(),
           router.dateRangeOptions.fetch()
    ).done(function () {
      router.setCurrentAccount();
      router.setCurrentDateRange();
    }, this);
  },

  routes: {
    "accounts"             : "accountIndex",
    "accounts/new"         : "newAccount",
    "accounts/:id/edit"    : "editAccount",
    "accounts/:id/show"    : "showAccount",
    "accounts/:id/reconciliation" : "newReconciliation",
    "accounts/current/transactions" : "currentAccountTransactions",
    "accounts/:id/transactions" : "accountTransactions",
    "accounts/:id/import"  : "importTransactions",
    "reports"  : "reportIndex",
    "reports/eod_balance"  : "reportEodBalance",
    "reports/category/:id"  : "reportCategory",
    "reports/category/"  : "reportUnassignedCategory",
    "reports/subcategory/:category_id/:subcategory_id"  : "subcategoryReport",
    "reports/subcategory/:category_id/"  : "subcategoryReportNoSubcategory",
    "reports/subcategory"  : "subcategoryReportNoParams",
    "reports/income_vs_expense"  : "reportIncomeVsExpense",
    "reports/income_expense_bar"  : "reportIncomeExpenseBar",
    ".*"                   : "accountIndex",
    'categories' : 'categoryIndex',
    'patterns': 'patternIndex',
    'accounts/:id/patterns': 'patternIndexForAccount'
  },

// account routes
  accountIndex: function() {
    this.loadView(new MyMoney.Views.AccountsIndexView({
      accountTypes: this.accountTypes
    }));
  },

  newAccount: function() {
    this.loadView(new MyMoney.Views.AccountNewView({
      collection: this.accounts,
      accountTypes: this.accountTypes
    }));
  },

  editAccount: function(id) {
    account = this.accounts.get(id);
    this.showView(new MyMoney.Views.AccountEditView({model: account, collection: this.accounts}));
  },

  showAccount: function(id) {
    var account = this.accounts.get(id);
    var accountType = this.accountTypes.get(account.get('account_type_id'));
    this.loadView(new MyMoney.Views.AccountSummaryView({
      model: account
    }));
  },

// transaction routes
  accountTransactions: function(id) {
    var account = this.accounts.get(id);
    this.setCurrentAccount(account);

    this.loadView(new MyMoney.Views.TransactionsIndexView({
      account: this.currentAccount,
      accounts: this.accounts,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories,
      dateRangeOptions: this.dateRangeOptions,
      currentDateRange: this.currentDateRange,
      transactionTypes: this.transactionTypes
    }));
  },

  currentAccountTransactions: function() {
    this.navigate('accounts/' + this.currentAccount.id + '/transactions', {trigger: true});
  },

  importTransactions: function(id) {
    var account = this.accounts.get(id);
    this.showView(new MyMoney.Views.ImportView({
      account: account,
      accounts: this.accounts,
      categories: this.categories,
      subcategories: this.subcategories,
      categoryTypes: this.categoryTypes
    }));
  },

// reconciliation routes
  newReconciliation: function(account_id) {
    var router = this;
    account = this.accounts.get(account_id);
    reconciliations = new MyMoney.Collections.Reconciliations([], {account_id: account.id});
    
    $.when(reconciliations.fetch()).done(function () {
      router.showView(new MyMoney.Views.ReconciliationView({account: account, 
            collection: reconciliations, accounts: router.accounts}));
    });  
  },

// categories + subcategories
  categoryIndex: function() {
    this.loadView(new MyMoney.Views.CategoryIndexView({
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    }));
  },

// patterns
  patternIndexForAccount: function(account_id){
    this.setCurrentAccount(this.accounts.get(account_id));
    this.patternIndex();
  },

  patternIndex: function() {
    this.loadView(new MyMoney.Views.PatternIndexView({
      account: this.currentAccount,
      accounts: this.accounts,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    }));
  },

// REPORTS
  reportIndex: function() {
    this.showView(new MyMoney.Views.ReportView());
  },

  reportIncomeVsExpense: function() {
    this.showView(new MyMoney.Views.IncomeVsExpenseReportView({
      dateRangeOptions: this.dateRangeOptions,
      currentDateRange: this.currentDateRange,
      categories: this.categories,
      subcategories: this.subcategories
    }));
    this.currentView.updateReport();
  },

  reportEodBalance: function() {
    this.showView(new MyMoney.Views.EodBalanceReportView({
      account: this.currentAccount,
      accounts: this.accounts,
      dateRangeOptions: this.dateRangeOptions,
      currentDateRange: this.currentDateRange
    }));
    this.currentView.updateReport();
  },

  reportUnassignedCategory: function() {
    this.reportCategory(null);
  },

  reportCategory: function(category_id) {
    var category = this.categories.get(category_id);

    this.loadView(new MyMoney.Views.CategoryReportView({
      category: category,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories,
      dateRangeOptions: this.dateRangeOptions,
      currentDateRange: this.currentDateRange,
      transactionTypes: this.transactionTypes
    }));
  },

  subcategoryReport: function(category_id, subcategory_id) {
    var category = this.categories.get(category_id);
    var subcategory = this.subcategories.get(subcategory_id);

    this.loadView(new MyMoney.Views.SubcategoryReportView({
      category: category,
      subcategory: subcategory,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories,
      dateRangeOptions: this.dateRangeOptions,
      currentDateRange: this.currentDateRange,
      transactionTypes: this.transactionTypes
    }));
  },

  subcategoryReportNoParams: function(){
    this.subcategoryReport(null, null);
  },

  subcategoryReportNoSubcategory: function(category_id){
    this.subcategoryReport(category_id, null);
  },

  reportIncomeExpenseBar: function() {
    this.showView(new MyMoney.Views.IncomeExpenseBarReportView());
    this.currentView.updateReport();
  },

// header + footer
  loadHeader: function(){
    this.header = new MyMoney.Views.HeaderView();
    $('#header').html(this.header.render().el);
  },

  loadFooter: function(){
    this.footer = new MyMoney.Views.FooterView();
    $('#footer').html(this.footer.render().el);
  },

// utilities 
  loadView: function(view){
    var router = this;
    $.when(view.fetchData()).done(function(){
      router.removeCurrentView();
      router.currentView = view;
      view.render();
      $('#content').html(view.el);
      if (view.draw) { view.draw(); }
    });
  },

  showView: function(newView) {
    this.removeCurrentView();
    this.currentView = newView;
    $('#content').html(this.currentView.render().el);
  },

  removeCurrentView: function() {
    if (this.currentView) {
      this.currentView.remove();
    }
  },

  setCurrentDateRange: function(date_range_option) {
    this.currentDateRange = date_range_option || this.dateRangeOptions.where({'default': true})[0];
  },

  setCurrentAccount: function(account) {
    this.currentAccount = account || this.accounts.at(0);
  }

});
