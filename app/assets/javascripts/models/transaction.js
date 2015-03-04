MyMoney.Models.Transaction = Backbone.Model.extend({

  name: "transaction",

  urlRoot: function() {
    return '/accounts/' + this.get('account_id') + '/transactions';
  },

  parse : function(resp, xhr) {
		return resp["transaction"] || resp;
  },

  validation: {
    date: {
      required: true
    },
    amount: {
      required: true
    },
    account_id: {
    	required: true
    }
  }

});