
MyMoney.Views.TransactionsIndexView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

	template: "transactions/transactions_index",

  events: {
    "click #new": "newTransaction"
  },

	addAll: function(){
	    for (i = 0; i < this.collection.length; i++) { 
	    	this.addOne(this.collection.models[i]);
    	}
	},

	addOne: function(model){
	    var rowView = new MyMoney.Views.TransactionRowView({model: model});
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
//    window.router.navigate('accounts/new', {trigger: true});
  }

});