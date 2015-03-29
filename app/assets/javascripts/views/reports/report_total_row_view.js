MyMoney.Views.ReportTotalRowView = Backbone.View.extend({

  template: "reports/report_total_row",
  tagName: "tr",
  className: "totals",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({total: this.model}));
    return this;
  }
});