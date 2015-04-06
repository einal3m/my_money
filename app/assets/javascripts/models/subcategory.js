MyMoney.Models.Subcategory = Backbone.Model.extend({

  urlRoot: 'subcategories',

  parse : function(resp, xhr) {
  return resp["subcategory"] || resp;
  },

  validation: {
    name: {
      required: true
    },
    category_id: {
      required: true
    }
  }


});