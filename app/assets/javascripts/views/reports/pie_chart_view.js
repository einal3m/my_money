MyMoney.Views.PieChartView = Backbone.View.extend({

  initialize: function() {
    this.report_id = this.options['report_id'];
    this.sums = this.options['sums'];
    this.labels = this.options['labels'];
  },

  render: function() {
    pie_chart(this.sums, this.labels, "", "", this.report_id);
    return this;
  }
});
