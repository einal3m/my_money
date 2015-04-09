MyMoney.Models.Category = Backbone.Model.extend({

  name: 'category',
  urlRoot: 'categories',

  parse : function(resp, xhr) {
	return resp["category"] || resp;
  }

});