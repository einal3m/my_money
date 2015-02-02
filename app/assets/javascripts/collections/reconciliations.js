
MyMoney.Collections.ReconciliationsCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Reconciliation,

  url: '/reconciliations',

  parse : function(resp, xhr) {
  	return resp.reconciliations;
  },

});