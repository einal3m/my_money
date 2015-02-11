MyMoney.Models.Reconciliation = Backbone.Model.extend({

  urlRoot: function() {
    return '/accounts/' + this.get('account_id') + '/reconciliations';
  },

  parse : function(resp, xhr) {
		return resp["reconciliation"] || resp;
  }
});
