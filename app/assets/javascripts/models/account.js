MyMoney.Models.Account = Backbone.Model.extend({

  urlRoot: 'accounts',

  parse : function(resp, xhr) {
	return resp["account"] || resp;
  }

});