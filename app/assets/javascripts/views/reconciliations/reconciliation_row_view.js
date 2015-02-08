MyMoney.Views.ReconciliationRowView = Backbone.View.extend({

  template: "reconciliations/reconciliation_row",
  tagName: "tr",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  }

});