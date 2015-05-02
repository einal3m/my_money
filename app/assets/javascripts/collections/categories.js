MyMoney.Collections.Categories = Backbone.Collection.extend({

  model: MyMoney.Models.Category,
  url: '/categories',
  comparator: 'name',

  parse : function(resp, xhr) {
    return resp.categories;
  },

  findByCategoryType: function(categoryType){
    return new MyMoney.Collections.Categories(this.where({category_type_id: categoryType.id}));
  },

  sortByNameForCategoryType: function(categoryType){
    var categories = this.where({category_type_id: categoryType.id});
    return new MyMoney.Collections.Categories(
      _.sortBy(categories, function(category) { return category.get('name'); })
    );
  }

});
