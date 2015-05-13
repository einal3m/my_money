MyMoney.Views.BarChartView = Backbone.View.extend({
  render: function($el) {
    bar_chart(this.model, '#bar_chart');
    return this;
  }
});