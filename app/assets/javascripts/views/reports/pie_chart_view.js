MyMoney.Views.PieChartView = Backbone.View.extend({

  initialize: function() {
    this.selector = this.options.report_id;
    this.sums = this.options.sums;
    this.labels = this.options.labels;
  },

  render: function() {
    pie_chart(this.sums, this.labels, this.selector);
    return this;
  }
});
