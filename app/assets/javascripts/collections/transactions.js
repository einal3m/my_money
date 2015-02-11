MyMoney.Collections.TransactionsCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Transaction,

  initialize: function(models, options) {
    this.account_id = _.result(options, 'account_id');
  },

  url: function() {
    return '/transactions/unreconciled?account_id=' + this.account_id;
  },

  parse : function(resp, xhr) {
  	return resp.transactions;
  }

});