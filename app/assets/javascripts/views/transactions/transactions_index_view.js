
MyMoney.Views.TransactionsIndexView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

	template: "transactions/transactions_index",

  events: {
    "click #new": "newTransaction",
    "click #cancel": "removeSubView",
    "click .fa-edit": "editTransaction",
    "click #import": "importTransactions",
    "click #search": "searchTransactions"
  },

  initialize: function() {
    this.accounts = this.options['accounts'];
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
    this.dateRangeOptions = this.options['dateRangeOptions'];
    this.currentDateRange = this.options['currentDateRange'];
    this.listenTo(this.collection, 'add', this.fetchTransactions);
  },

	addAll: function(){
	    for (var i = 0; i < this.collection.length; i++) { 
	    	this.addOne(this.collection.models[i]);
    	}
	},

	addOne: function(model){
	    var rowView = new MyMoney.Views.TransactionRowView({
        model: model,
        categories: this.categories,
        subcategories: this.subcategories
      });
	    this.$el.find('tbody').append(rowView.render().el);

	},

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]({
      account: this.model.toJSON()
    }));
    this.addSubView('filter', new MyMoney.Views.FilterView({
      account: this.model,
      accounts: this.accounts,
      date_range: this.currentDateRange,
      date_range_options: this.dateRangeOptions
    }))
    this.addAll();
    this.renderSubViews();
    return this;
  },

  newTransaction: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.subView && this.subView.rendered) {
      return;
    }

    this.subView = new MyMoney.Views.TransactionNewView({
      account: this.model,
      collection: this.collection,
      categories: this.categories,
      subcategories: this.subcategories,
      categoryTypes: this.categoryTypes
    });
    this.$el.find('tbody').prepend(this.subView.render().el);
    this.subView.rendered = true;
  },

  fetchTransactions: function() {
    var thisView = this;
      $.when(this.collection.fetch()).done(function () {
        thisView.removeSubView();
        thisView.render();
    });
  },

  removeSubView: function() {
    if (this.subView.rendered) {
      this.subView.remove();
      this.subView.rendered = false;
    }
    if (this.edit_row) {
      this.edit_row.removeClass('success');
    }
  },

  editTransaction: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.subView && this.subView.rendered) {
      return;
    }

    var txn_id = e.currentTarget.getAttribute('id')
    var txn = this.collection.get(txn_id);
    this.edit_row = this.$el.find('#'+txn_id).closest('tr');
    this.subView = new MyMoney.Views.TransactionEditView({
      model: txn, 
      categories: this.categories,
      subcategories: this.subcategories,
      categoryTypes: this.categoryTypes
    });
    this.edit_row.after(this.subView.render().el);
    this.edit_row.addClass('success');
    this.subView.rendered = true;
    this.listenTo(txn, 'sync', this.fetchTransactions);
  },

  importTransactions: function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('accounts/' + this.model.id + '/import', {trigger: true});
  },

  searchTransactions: function(e) {
    // e.preventDefault();
    e.stopPropagation();
    // var from_date = this.$('#from_date').val();
    // var to_date = this.$('#to_date').val();
    var date_range_option_id = this.$('#date_range_option_id').val();
    window.router.setCurrentDateRange(this.dateRangeOptions.get(date_range_option_id));
    
    var accountSelected = this.$('#account_id').val();
    if (accountSelected != this.model.id) {
      window.router.navigate('accounts/' + accountSelected + '/transactions');
    }
    window.router.accountTransactions(accountSelected);
  }

});