MyMoney.Models.CategoryType = Backbone.Model.extend({

  urlRoot: 'category_types',

  parse : function(response, xhr) {
    return response.category_type || response;
  }

});