MyMoney.Views.ReconciliationNewView = Backbone.View.extend({

  template: "reconciliations/reconciliation_new",

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

    this.model.set({statement_date: this.$('#statement_date').val()});
    this.model.set({statement_balance: this.$('#statement_balance').val()});
    this.model.save({}, { wait: true, done: this.trigger('startReconcile') });
  },

  goBack: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Backbone.history.history.back()  
  }

});