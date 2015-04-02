MyMoney.Views.IncomeExpenseBarReportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "reports/income_expense_bar",


  initialize: function() {
    this.model = new MyMoney.Models.BaseReport({}, {reportName: 'income_expense_bar'});
  },

  updateReport: function() {
    var view = this;

    $.when(this.model.fetch()).done(function () {
      view.draw();
    });
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    return this;
  },

  draw: function() {
    this.undraw();
    this.chartView = new MyMoney.Views.BarChartView({model: this.model.get('report')});
    this.chartView.render();
  },

  undraw: function() {
    if (this.$('svg')) {
      this.$('svg').remove();
    }
  }
});
