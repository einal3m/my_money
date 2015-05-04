MyMoney.Views.TransactionsIndexView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",
	template: "transactions/transactions_index",

  events: {
    "click #import": "importTransactions",
    "click #search": "searchTransactions"
  },

  initialize: function() {
    this.account = this.options.account;
    this.accounts = this.options.accounts;
    this.categoryTypes = this.options.categoryTypes;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.dateRangeOptions = this.options.dateRangeOptions;
    this.currentDateRange = this.options.currentDateRange;
  },

  fetchData: function(){
    this.collection = new MyMoney.Collections.TransactionsCollection([], {account_id: this.account.id});
    return this.collection.fetch({ 
      data: $.param({
        from_date: this.currentDateRange.get('from_date'), 
        to_date: this.currentDateRange.get('to_date') }) 
    });
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());

    this.addSubView('filter', new MyMoney.Views.FilterView({
      account: this.account,
      accounts: this.accounts,
      date_range: this.currentDateRange,
      date_range_options: this.dateRangeOptions
    }));

    this.addSubView('transactions-table', new MyMoney.Views.TransactionTableView({
      collection: this.collection,
      account: this.account,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    }));

    this.renderSubViews();
    this.collection.on('add destroy change', this.reloadPage, this);
    return this;
  },

  importTransactions: function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('accounts/' + this.account.id + '/import', {trigger: true});
  },

  searchTransactions: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var date_range_option_id = this.$('#date_range_option_id').val();
    window.router.setCurrentDateRange(this.dateRangeOptions.get(date_range_option_id));
    
    var account_id = this.$('#account_id').val();
    window.router.setCurrentAccount(this.accounts.get(account_id));

    this.reloadPage();
  },

  reloadPage: function() {
    window.location = '#accounts/current/transactions';
  }

});
