
MyMoney.Views.ReportView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",
  template: "reports/report_index",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    return this;
  }
});