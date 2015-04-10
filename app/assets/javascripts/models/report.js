MyMoney.Models.Report = Backbone.Model.extend({

  initialize: function(attributes, options) {
    this.reportName = _.result(options, 'reportName');
  },

  urlRoot: function() {
    return 'report/' + this.reportName;
  },

  validation: {
    from_date: {
      required: true
    },
    to_date: {
      required: true
    }
  }
});
