MyMoney.Views.ReportSubcategoryRowView = Backbone.View.extend({

  template: "reports/report_subcategory_row",
  tagName: "tr",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model));
    return this;
  }
});