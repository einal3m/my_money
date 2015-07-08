MyMoney.Collections.Subcategories = Backbone.Collection.extend({

  model: MyMoney.Models.Subcategory,
  url: '/subcategories',

  comparator: function(subcategory){
    return subcategory.get('name').toLowerCase();
  },

  parse : function(resp, xhr) {
    return resp.subcategories;
  },

  findByCategory: function(category) {
    return new MyMoney.Collections.Subcategories(this.where({category_id: category.id}));
  }
});
