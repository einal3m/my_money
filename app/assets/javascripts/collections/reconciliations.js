
MyMoney.Collections.ReconciliationsCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Reconciliation,

  initialize: function(models, options) {
    this.account_id = _.result(options, 'account_id');
  },

  url: function() {
    return '/accounts/' + this.account_id + '/reconciliations';
  },

  parse : function(resp, xhr) {
  	return resp.reconciliations;
  }

});