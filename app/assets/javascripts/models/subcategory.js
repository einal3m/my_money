MyMoney.Models.Subcategory = Backbone.Model.extend({

  name: 'subcategory',
  urlRoot: 'subcategories',

  parse : function(response, xhr) {
    return response.subcategory || response;
  },

  validation: {
    name: {
      required: true
    },
    category_id: {
      required: true,
      msg: 'Category is required'
    }
  }
});
