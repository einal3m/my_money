
MyMoney.Collections.CategoriesCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Category,

  url: '/categories',

  parse : function(resp, xhr) {
  	return resp.categories;
  },

});