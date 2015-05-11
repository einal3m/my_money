MyMoney.Views.LineChartView = Backbone.View.extend({
  render: function() {
    line_chart(this.model.get('report'), '#line_chart');
    return this;
  }
});