MyMoney.Models.DateRangeOption = Backbone.Model.extend({

  urlRoot: 'date_range_options',

  parse : function(response, xhr) {
    return response.date_range_option || response;
  }

});