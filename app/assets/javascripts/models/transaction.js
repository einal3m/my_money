MyMoney.Models.Transaction = Backbone.Model.extend({

  urlRoot: 'transactions',

  parse : function(resp, xhr) {
		return resp["transaction"] || resp;
  }

});