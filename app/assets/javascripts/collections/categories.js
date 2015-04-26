MyMoney.Collections.Categories = Backbone.Collection.extend({

  model: MyMoney.Models.Category,
  url: '/categories',

  parse : function(resp, xhr) {
    return resp.categories;
  },

  sortByNameForCategoryType: function(categoryType){
    var categories = this.where({category_type_id: categoryType.id});
    return new MyMoney.Collections.Categories(
      _.sortBy(categories, function(category) { return category.get('name'); })
    );
  }

});
