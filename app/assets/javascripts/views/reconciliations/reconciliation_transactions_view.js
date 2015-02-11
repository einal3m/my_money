MyMoney.Views.ReconciliationTransactionsView = Backbone.View.extend({

  template: "reconciliations/reconciliation_transactions",

  addAll: function(){
    for (i = 0; i < this.collection.length; i++) { 
      this.addOne(this.collection.models[i]);
    }
  },

  addOne: function(model){
      var rowView = new MyMoney.Views.ReconciliationTransactionRowView({model: model});
      this.$el.find('tbody').append(rowView.render().el);
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addAll();
    return this;
  }
});