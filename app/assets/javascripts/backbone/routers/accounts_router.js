MyMoney.Routers.AccountsRouter = Backbone.Router.extend({

  initialize: function(options) {
    this.accounts = new MyMoney.Collections.AccountsCollection();
  },

  routes: {
    "index"       : "Accountindex",
    "new"         : "newAccount",
    ":id/edit"    : "edit",
    ".*"          : "Accountindex",
  },

  Accountindex: function() {
    var router = this;

    $.when(router.accounts.fetch()).done(function () {
      router.showView(new MyMoney.Views.AccountsIndexView({collection: router.accounts}));
    });
  },

  newAccount: function() {
    this.showView(new MyMoney.Views.AccountNewView({collection: this.accounts}));
  },

  edit: function(id) {
    account = this.accounts.get(id)
    this.showView(new MyMoney.Views.AccountEditView({model: account, collection: this.accounts}));
  },

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
