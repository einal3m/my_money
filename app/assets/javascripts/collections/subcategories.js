MyMoney.Collections.Subcategories = Backbone.Collection.extend({

  model: MyMoney.Models.Subcategory,
  comparator: 'name',
  url: '/subcategories',

  parse : function(resp, xhr) {
    return resp.subcategories;
  },

  findByCategory: function(category) {
    return new MyMoney.Collections.Subcategories(this.where({category_id: category.id}));
  },

  sortByNameForCategory: function(category){
    var subcategories = this.where({category_id: category.id});
    return new MyMoney.Collections.Subcategories(
      _.sortBy(subcategories, function(subcategory) { return subcategory.get('name'); })
    );
  }

});
