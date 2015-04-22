MyMoney.Collections.Patterns = Backbone.Collection.extend({

  model: MyMoney.Models.Pattern,

  initialize: function(models, options) {
    this.account_id = _.result(options, 'account_id');
  },

  url: function() {
    return '/accounts/' + this.account_id + '/patterns';
  },

  parse : function(response, xhr) {
    return response.patterns;
  }
});