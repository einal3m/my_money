
MyMoney.Views.TransactionsIndexView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

	template: "transactions/transactions_index",

  events: {
    "click #new": "newTransaction",
    "click #cancel": "removeNewView",
    "click .fa-edit": "editTransaction"
  },

  initialize: function() {
    this.categories = this.options['categories'];
    this.listenTo(this.collection, 'add', this.fetchTransactions);
  },

	addAll: function(){
	    for (i = 0; i < this.collection.length; i++) { 
	    	this.addOne(this.collection.models[i]);
    	}
	},

	addOne: function(model){
	    var rowView = new MyMoney.Views.TransactionRowView({model: model, categories: this.categories});
	    this.$el.find('tbody').append(rowView.render().el);

	},

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addAll();
    return this;
  },

  editTransaction: function(e) {
    e.preventDefault();
    e.stopPropagation();
    alert('edit transaction');
  },

  newTransaction: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.newView && this.newView.rendered) {
      return;
    }

    this.newView = new MyMoney.Views.TransactionNewView({account: this.model, collection: this.collection, categories: this.categories});
    this.$el.find('tbody').prepend(this.newView.render().el);
    this.newView.rendered = true;
  },

  fetchTransactions: function() {
    var thisView = this;
      $.when(this.collection.fetch()).done(function () {
        thisView.removeNewView();
        thisView.render();
    });
  },

  removeNewView: function() {
    if (this.newView.rendered) {
      this.newView.remove();
      this.newView.rendered = false;
    }
  }

});