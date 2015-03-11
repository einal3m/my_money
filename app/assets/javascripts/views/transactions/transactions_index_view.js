
MyMoney.Views.TransactionsIndexView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

	template: "transactions/transactions_index",

  events: {
    "click #new": "newTransaction",
    "click #cancel": "removeSubView",
    "click .fa-edit": "editTransaction",
    "click #import": "importTransactions"
  },

  initialize: function() {
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
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
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addAll();
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
  }

});