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

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    var filterView = new MyMoney.Views.FilterView({
      account: this.account,
      accounts: this.accounts
    });

    this.addSubView('filter', filterView);
    // this.listenTo(filterView, 'change #account_id', this.refreshPage);

    this.addSubView('pattern-table', new MyMoney.Views.PatternTableView({
      collection: this.collection,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    }));
    this.renderSubViews();
    return this;
  },

  // newTransaction: function(e) {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (this.subView && this.subView.rendered) {
  //     return;
  //   }

  //   this.subView = new MyMoney.Views.TransactionNewView({
  //     account: this.model,
  //     collection: this.collection,
  //     categories: this.categories,
  //     subcategories: this.subcategories,
  //     categoryTypes: this.categoryTypes
  //   });
  //   this.$el.find('tbody').prepend(this.subView.render().el);
  //   this.subView.rendered = true;
  // },

  // removeSubView: function() {
  //   if (this.subView.rendered) {
  //     this.subView.remove();
  //     this.subView.rendered = false;
  //   }
  //   if (this.edit_row) {
  //     this.edit_row.removeClass('success');
  //   }
  // },

  reloadPage: function() {
    var account_id = this.$('#account_id').val();
    window.router.navigate('accounts/' + account_id + '/patterns', {trigger: true});
    window.router.patternIndexForAccount(account_id);
  }
});
