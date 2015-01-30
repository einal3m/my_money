
MyMoney.Views.AccountsNetWorthView = Backbone.View.extend({

  tagName: "tr", 
  className: "totals",
	template: JST["templates/accounts/accounts_net_worth"],

	netWorth: parseFloat("0.00"),

	initialize: function(){
		this.calculateNetWorth();
	},

  render: function(){
  	this.$el.html(this.template({netWorth: this.netWorth}));
  	return this;
  },

  calculateNetWorth: function(){
    for (i = 0; i < this.collection.length; i++) { 
        this.netWorth += parseFloat(this.collection.models[i].get("current_balance"));
    }
  }

});
