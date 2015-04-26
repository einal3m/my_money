MyMoney.Views.PatternIndexView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",
  template: "patterns/patterns_index",

// TODO: filter should trigger event
  events: {
    "change #account_id": "reloadPage"
  },

  initialize: function() {
    this.account = this.options.account;
    this.accounts = this.options.accounts;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
  },

  fetchData: function(){
    this.collection = new MyMoney.Collections.Patterns([], {account_id: this.account.id});
    return this.collection.fetch();
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    var filterView = new MyMoney.Views.FilterView({
      account: this.account,
      accounts: this.accounts
    });

    this.addSubView('filter', filterView);

    this.addSubView('pattern-table', new MyMoney.Views.PatternTableView({
      collection: this.collection,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    }));
    this.renderSubViews();
    return this;
  },

  reloadPage: function() {
    var account_id = this.$('#account_id').val();
    window.location = '#accounts/' + account_id + '/patterns';
  }
  
});
