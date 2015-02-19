MyMoney.Models.Transaction = Backbone.Model.extend({

  urlRoot: function() {
    return '/accounts/' + this.get('account_id') + '/transactions';
  },

  parse : function(resp, xhr) {
		return resp["transaction"] || resp;
  }

});