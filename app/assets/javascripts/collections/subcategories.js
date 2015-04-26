MyMoney.Collections.Subcategories = Backbone.Collection.extend({

  model: MyMoney.Models.Subcategory,

  url: '/subcategories',

  parse : function(resp, xhr) {
    return resp.subcategories;
  },

  sortByNameForCategory: function(category){
    var subcategories = this.where({category_id: category.id});
    return new MyMoney.Collections.Subcategories(
      _.sortBy(subcategories, function(subcategory) { return subcategory.get('name'); })
    );
  }

});
