MyMoney.Collections.CategoryTypes = Backbone.Collection.extend({

  model: MyMoney.Models.CategoryType,

  url: '/category_types',

  parse : function(resp, xhr) {
    return resp.category_types;
  }

});