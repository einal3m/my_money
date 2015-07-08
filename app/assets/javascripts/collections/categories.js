MyMoney.Collections.Categories = Backbone.Collection.extend({

  model: MyMoney.Models.Category,
  url: '/categories',

  comparator: function(category) {
    return category.get('name').toLowerCase();
  },

  parse : function(resp, xhr) {
    return resp.categories;
  },

  findByCategoryType: function(categoryType){
    return new MyMoney.Collections.Categories(this.where({category_type_id: categoryType.id}));
  }
});
