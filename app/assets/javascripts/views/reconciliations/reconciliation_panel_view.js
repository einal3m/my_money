MyMoney.Views.ReconciliationPanelView = Backbone.View.extend({

  template: "reconciliations/reconciliation_panel",

  events: {
    "click #reconcile": "reconcileAccount",
    "click #cancel" : "goBack"   
  },

  initialize: function(options){
    this.account = this.options.account;
    this.reconciliation_balance = this.options.reconciliation_balance;
    this.balance_difference = this.options.balance_difference;
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          account: this.account.toJSON(), 
          reconciliation: this.model.toJSON(),
          reconciliation_balance: this.reconciliation_balance,
          balance_difference: this.balance_difference}));
    return this;
  },

  reconcileAccount: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.trigger('finishReconcile');
  },

  goBack: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Backbone.history.history.back();
  }

});