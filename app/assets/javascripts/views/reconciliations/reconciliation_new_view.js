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
    Backbone.Validation.bind(this);
    return this;
  },

  reconcileAccount: function(e){
    e.preventDefault();
    e.stopPropagation();

    var new_statement_balance = dollarsToCents(this.$('#statement_balance').val());
    this.model.set({statement_date: this.$('#statement_date').val()});
    this.model.set({statement_balance: new_statement_balance});

    if(this.model.isValid(true)){
      this.model.save({}, { wait: true, done: this.trigger('startReconcile') });
    }
  },

  goBack: function(e) {
    e.preventDefault();
    e.stopPropagation();
    Backbone.history.history.back()  
  }

});