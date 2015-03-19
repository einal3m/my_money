MyMoney.Models.DateRangeOption = Backbone.Model.extend({

  urlRoot: 'date_range_option',

  parse : function(resp, xhr) {
  return resp["date_range_option"] || resp;
  }

});