MyMoney.Views.ReconciliationView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",
  template: "reconciliations/reconciliation",

  initialize: function(options){
    this.account = this.options['account'];
    this.accounts = this.options['accounts'];
    this.get_last_reconciliation();
    this.panel1SubView = new MyMoney.Views.ReconciliationNewView({model: this.model, 
                                                               account: this.account});
    this.panel2SubView = new MyMoney.Views.ReconciliationHistoryView({collection: this.collection});
    this.listenTo(this.panel1SubView, "startReconcile", this.startReconcile);
  },

  get_last_reconciliation: function() {

    if (this.collection.length > 0) {
      this.model = this.collection.models[0];
      if (!this.model.get('reconciled')) {
        this.last_reconciliation = this.collection.models[1];
      } else {
        this.last_reconciliation = this.collection.models[0];
        this.model = new MyMoney.Models.Reconciliation;
        this.model.set({account_id: this.account.id});
      }
    } else {
      this.model = new MyMoney.Models.Reconciliation;
      this.model.set({account_id: this.account.id});
      this.last_reconciliation = null;
    }

    console.log('get_last_rec');
    console.log(this.model);
    console.log(this.last_reconciliation);
  },

  addPanel1SubView: function() {
    this.$el.find('#panel1').html(this.panel1SubView.render().el);
  },

  addPanel2SubView: function() {
    this.$el.find('#panel2').html(this.panel2SubView.render().el);
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addPanel1SubView();
    this.addPanel2SubView();
    return this;
  },

  set_reconciled_state: function() {
    var statement_date = new Date(this.model.get('statement_date'));
    for (i = 0; i < this.transactions.length; i++) { 
      var transaction_date = new Date(this.transactions.models[i].get('date'));
      var reconcile = transaction_date <= statement_date;
      this.transactions.models[i].set('reconciled', reconcile);
    }
  },

  startReconcile: function() {
    var that = this;
    this.panel2SubView.remove();
    this.transactions = new MyMoney.Collections.TransactionsCollection([], {account_id: account.id});
    $.when(this.transactions.fetch()).done(function () {
      that.set_reconciled_state();
      that.panel2SubView = new MyMoney.Views.ReconciliationTransactionsView({model: that.model, collection: that.transactions});
      that.addPanel2SubView();
      // TODO: add panel1
    });  
  }
});