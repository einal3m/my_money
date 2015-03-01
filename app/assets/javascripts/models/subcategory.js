MyMoney.Models.Subcategory = Backbone.Model.extend({

  urlRoot: 'subcategories',

  parse : function(resp, xhr) {
  return resp["subcategory"] || resp;
  }

});