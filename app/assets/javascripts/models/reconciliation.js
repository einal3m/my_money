MyMoney.Models.Reconciliation = Backbone.Model.extend({

  urlRoot: function() {
    return 'accounts/' + this.get('account_id') + '/reconciliations';
  },

  parse : function(response, xhr) {
		return response.reconciliation || response;
  },

  validation: {
    statement_date: {
      required: true
    },
    statement_balance: {
      required: true
    }
  }

});
