MyMoney.Views.BarChartView = Backbone.View.extend({
  render: function() {
    bar_chart(this.model.get('report'), '#bar_chart')
    return this;
  }
});