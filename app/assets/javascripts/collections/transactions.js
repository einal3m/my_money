MyMoney.Collections.TransactionsCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Transaction,

  initialize: function(models, options) {
    this.account_id = _.result(options, 'account_id');
    this.date_range = _.result(options, 'date_range');
    this.action = _.result(options, 'action');
  },

  url: function() {
    if (this.action == 'reconcile') {
      return '/accounts/' + this.account_id + '/transactions/unreconciled';
    } else {
      return '/accounts/' + this.account_id + 
             '/transactions?from_date=' + 
             this.date_range.get('from_date') + '&to_date=' +
             this.date_range.get('to_date');
    }
  },

  parse : function(resp, xhr) {
  	return resp.transactions;
  }
});