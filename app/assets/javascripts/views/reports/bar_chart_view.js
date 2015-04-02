MyMoney.Views.BarChartView = Backbone.View.extend({
  render: function() {
    bar_chart(this.model, '#bar_chart')
    return this;
  }
});