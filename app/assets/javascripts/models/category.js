MyMoney.Models.Category = Backbone.Model.extend({

  urlRoot: 'categories',

  parse : function(resp, xhr) {
	return resp["category"] || resp;
  }

});