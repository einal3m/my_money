MyMoney.Views.ReconciliationNewView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

  template: "reconciliations/reconciliation_new",

  events: {
    "click #reconcile": "reconcileAccount",
    "click #cancel" : "goBack"   
  },

  initialize: function(options){
    this.account = this.options['account'];
    this.accounts = this.options['accounts'];
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          account: this.account.toJSON(), 
          accounts: this.accounts.toJSON()}));
    return this;
  },

  reconcileAccount: function(e){
    e.preventDefault();
    e.stopPropagation();

    this.model = new MyMoney.Models.Reconciliation({});
    this.model.set({account_id: this.account.id});
    this.model.set({statement_date: this.$('#statement_date').val()});
    this.model.set({statement_balance: this.$('#statement_balance').val()});
    this.model.set({last_reconcilation_id: this.$('#last_reconciliation_id').val()});
    this.model.save({}, { wait: true, success: this.startReconcile });
  },

  startReconcile: function(model, response, options) {
 console.log("startReconcile");
console.log("reconciliation:");
console.log(this.model);
  },

  goBack: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Backbone.history.history.back()  
  }

});