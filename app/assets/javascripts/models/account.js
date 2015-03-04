MyMoney.Models.Account = Backbone.Model.extend({

  urlRoot: 'accounts',

  name: "account",

  parse : function(resp, xhr) {
	return resp["account"] || resp;
  }

});