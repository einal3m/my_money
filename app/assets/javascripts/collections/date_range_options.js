
MyMoney.Collections.DateRangeOptionsCollection = Backbone.Collection.extend({

  model: MyMoney.Models.DateRangeOption,

  url: '/date_range_options',

  parse : function(resp, xhr) {
    return resp.date_range_options;
  },

});