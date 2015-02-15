MyMoney.Views.ReconciliationNewView = Backbone.View.extend({

  template: "reconciliations/reconciliation_new",

  // tagName: "div", 
  // id: "panel1",

  events: {
    "click #reconcile": "reconcileAccount",
    "click #cancel" : "goBack"   
  },

  initialize: function(options){
    this.account = this.options['account'];
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          account: this.account.toJSON(), 
          reconciliation: this.model.toJSON()}));
    return this;
  },

  reconcileAccount: function(e){
    e.preventDefault();
    e.stopPropagation();

    var new_statement_balance = dollarsToCents(this.$('#statement_balance').val());
    this.model.set({statement_date: this.$('#statement_date').val()});
    this.model.set({statement_balance: new_statement_balance});
    this.model.save({}, { wait: true, done: this.trigger('startReconcile') });
  },

  goBack: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Backbone.history.history.back()  
  }

});