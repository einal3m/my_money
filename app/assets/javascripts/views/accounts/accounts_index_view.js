
MyMoney.Views.AccountsIndexView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

	template: "accounts/account_index",

	addAll: function(){
	    for (i = 0; i < this.collection.length; i++) { 
	    	this.addOne(this.collection.models[i]);
    	}
	},

	addOne: function(model){
	    var rowView = new MyMoney.Views.AccountView({model: model});
	    this.$el.find('tbody').append(rowView.render().el);
	},

	addNetWorth: function(){
		var netWorthView = new MyMoney.Views.AccountsNetWorthView({collection: this.collection});
		this.$el.find('tbody').append(netWorthView.render().el);
	},

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addAll();
    this.addNetWorth();
    return this;
  }

});