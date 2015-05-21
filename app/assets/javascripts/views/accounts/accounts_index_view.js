
MyMoney.Views.AccountsIndexView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "accounts/account_index",

  events: {
    "click #new": "newAccount"
  },

  initialize: function(){
    this.accountTypes = this.options.accountTypes;
  },

  fetchData: function(){
    this.collection = new MyMoney.Collections.Accounts([]);
    return this.collection.fetch();
  },

  // addNetWorth: function(){
  //   var netWorthView = new MyMoney.Views.AccountsNetWorthView({collection: this.collection});
  //   this.$el.find('tbody').append(netWorthView.render().el);
  // },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.accountTypes.each(function(accountType) {
      var filteredAccounts = this.collection.findByAccountType(accountType);
      if (filteredAccounts.length > 0) {
        var tableView = new MyMoney.Views.AccountTypeTableView({
          model: accountType,
          collection: filteredAccounts,
          accounts: this.collection
        });
        this.$el.find('#account-types').append(tableView.render().el);
      }
    }, this);

    // this.addNetWorth();
    return this;
  },

  newAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('accounts/new', {trigger: true});
  }

});