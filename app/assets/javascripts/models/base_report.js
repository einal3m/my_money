MyMoney.Models.BaseReport = Backbone.Model.extend({

  initialize: function(attributes, options) {
    this.reportName = _.result(options, 'reportName');
  },

  urlRoot: function() {
    return '/report/' + this.reportName;
  },

});
