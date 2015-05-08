MyMoney.Routers.AccountsRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.fetchData();
  },

  fetchData: function(){
    var router = this;
    this.accounts = new MyMoney.Collections.Accounts();
    this.accountTypes = new MyMoney.Collections.AccountTypes();
    this.categoryTypes = new MyMoney.Collections.CategoryTypes();
    this.categories = new MyMoney.Collections.Categories();
    this.subcategories = new MyMoney.Collections.Subcategories();
    this.dateRangeOptions = new MyMoney.Collections.DateRangeOptionsCollection();

    $.when(router.accounts.fetch(), router.accountTypes.fetch()).done(function () {
      router.setCurrentAccount();
      router.accountIndex();
    }, this);

    this.categories.fetch();
    this.categoryTypes.fetch();
    this.subcategories.fetch();

    $.when(this.dateRangeOptions.fetch()).done(function () {
      router.setCurrentDateRange();
    });
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
    "reports/subcategory/:category_id/:subcategory_id"  : "reportSubcategory",
    "reports/subcategory/:category_id/"  : "reportUnassignedSubcategory",
    "reports/subcategory"  : "reportSubcategoryNoData",    
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
    this.showView(new MyMoney.Views.AccountNewView({collection: this.accounts}));
  },

  editAccount: function(id) {
    account = this.accounts.get(id);
    this.showView(new MyMoney.Views.AccountEditView({model: account, collection: this.accounts}));
  },

  showAccount: function(id) {
    account = this.accounts.get(id);
    this.showView(new MyMoney.Views.AccountSummaryView({model: account, collection: this.accounts}));
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
      currentDateRange: this.currentDateRange
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
    reconciliations = new MyMoney.Collections.ReconciliationsCollection([], {account_id: account.id});
    
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

// reports
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
    this.showView(new MyMoney.Views.CategoryReportView({
      category_id: category_id,
      accounts: this.accounts,
      dateRangeOptions: this.dateRangeOptions,
      currentDateRange: this.currentDateRange,
      categoryTypes: router.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    }));
    this.currentView.updateReport();
  },

  reportSubcategoryNoData: function() {
    this.showSubcategoryReport();
  },

  reportUnassignedSubcategory: function(category_id) {
    this.reportSubcategory(category_id, null);
  },

  reportSubcategory: function(category_id, subcategory_id) {
    this.showSubcategoryReport(category_id, subcategory_id);
    this.currentView.updateReport();
  },

  showSubcategoryReport: function(category_id, subcategory_id){
    this.showView(new MyMoney.Views.SubcategoryReportView({
      subcategory_id: subcategory_id,
      category_id: category_id,
      accounts: this.accounts,
      dateRangeOptions: this.dateRangeOptions,
      currentDateRange: this.currentDateRange,
      categoryTypes: router.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    }));
  },

  reportIncomeExpenseBar: function() {
    this.showView(new MyMoney.Views.IncomeExpenseBarReportView());
    this.currentView.updateReport();
  },

// utilities 
  loadView: function(view){
    var router = this;
    $.when(view.fetchData()).done(function(){
      router.removeCurrentView();
      router.currentView = view;
      view.render();
      $('#content').html(view.el);
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
    this.currentDateRange = date_range_option || this.dateRangeOptions.where({default: true})[0];
  },

  setCurrentAccount: function(account) {
    this.currentAccount = account || this.accounts.at(0);
  }

});
