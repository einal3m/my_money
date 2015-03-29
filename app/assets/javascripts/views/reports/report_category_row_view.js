MyMoney.Views.ReportCategoryRowView = Backbone.View.extend({

  template: "reports/report_category_row",
  tagName: "tr",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model));
    return this;
  }
});