MyMoney.Routers.AccountsRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.accounts = new MyMoney.Collections.AccountsCollection();
    this.accountIndex();
  },

  routes: {
    "accounts/index"       : "accountIndex",
    "accounts/new"         : "newAccount",
    "accounts/:id/edit"    : "editAccount",
    "accounts/:id/show"    : "showAccount",

    "reconciliations/new/account:id" : "newReconciliation",
    ".*"                   : "accountIndex",
  },

// account routes
  accountIndex: function() {
console.log("accountindex")
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

// reconciliation routes
  newReconciliation: function(account_id) {
    account = this.accounts.get(account_id);
    console.log("router");

    console.log("account_id");
    console.log(account_id);
    console.log("account");
    console.log(account);
    this.showView(new MyMoney.Views.ReconciliationNewView({account: account, accounts: this.accounts}))
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
