MyMoney.Views.ReconciliationTransactionRowView = Backbone.View.extend({

  template: "reconciliations/reconciliation_transaction_row",
  tagName: "tr",

  // events: {
  //   'click [type="checkbox"]': 'toggleTransaction'
  // },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  // },

  // toggleTransaction: function(e) {
  //   e.stopPropagation();

  //   var checked = e.currentTarget.checked;
  //   var cid = e.currentTarget.id;
		// console.log('toggleTransaction');
		// console.log(checked);
		// console.log(cid);
		// console.log(this);
		// this.trigger('toggleTransaction', checked, cid);
  }

});