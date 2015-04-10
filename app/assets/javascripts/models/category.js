MyMoney.Models.Category = Backbone.Model.extend({

  name: 'category',
  urlRoot: 'categories',

  parse : function(response, xhr) {
    return response.category || response;
  },

  validation: {
    name: {
      required: true
    },
    category_type_id: {
      required: true,
      msg: 'Category type is required'
    }
  }
});