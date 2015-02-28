MyMoney.Collections.CategoryTypesCollection = Backbone.Collection.extend({

  model: MyMoney.Models.CategoryTypes,

  url: '/category_types',

  parse : function(resp, xhr) {
  	return resp.category_types;
  },

});