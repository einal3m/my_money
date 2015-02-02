MyMoney.Models.Reconciliation = Backbone.Model.extend({

  urlRoot: 'reconciliations',

  parse : function(resp, xhr) {
	return resp["reconciliation"] || resp;
  }

});