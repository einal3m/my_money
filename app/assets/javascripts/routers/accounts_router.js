MyMoney.Routers.AccountsRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.accounts = new MyMoney.Collections.AccountsCollection();
    this.accountIndex();
    this.categories = new MyMoney.Collections.CategoriesCollection();
    this.categories.fetch();
    this.categoryTypes = new MyMoney.Collections.CategoryTypesCollection();
    this.categoryTypes.fetch();
    this.subcategories = new MyMoney.Collections.SubcategoriesCollection();
    this.subcategories.fetch();
  },

  routes: {
    "accounts"             : "accountIndex",
    "accounts/new"         : "newAccount",
    "accounts/:id/edit"    : "editAccount",
    "accounts/:id/show"    : "showAccount",
    "accounts/:id/reconciliation" : "newReconciliation",
    "accounts/:id/transactions" : "accountTransactions",
    ".*"                   : "accountIndex"
  },

// account routes
  accountIndex: function() {
    var router = this;

    $.when(router.accounts.fetch()).done(function () {
      router.showView(new MyMoney.Views.AccountsIndexView({collection: router.accounts}));
    });
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
    var router = this;
    router.transactions = new MyMoney.Collections.TransactionsCollection([], {account_id: id});

    $.when(router.transactions.fetch()).done(function () {
      router.showView(new MyMoney.Views.TransactionsIndexView({
        model: account,
        collection: router.transactions,
        categories: router.categories,
        subcategories: router.subcategories,
        categoryTypes: router.categoryTypes,
      }));
    });
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


// utilities
  showView: function(newView) {
    this.removeCurrentView;
    this.currentView = newView;
    $('#content').html(this.currentView.render().el);
  },

  removeCurrentView: function() {
    if (this.currentView) {
      this.currentView.remove();
    }
  }

});
