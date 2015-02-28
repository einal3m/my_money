MyMoney.Models.CategoryTypes = Backbone.Model.extend({

  urlRoot: 'category_types',

  parse : function(resp, xhr) {
	return resp["category_type"] || resp;
  }

});