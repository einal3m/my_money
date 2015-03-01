
MyMoney.Collections.SubcategoriesCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Subcategory,

  url: '/subcategories',

  parse : function(resp, xhr) {
  	return resp.subcategories;
  },

});