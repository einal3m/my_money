MyMoney.Views.ReconciliationView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",
  template: "reconciliations/reconciliation",

  initialize: function(options){
    this.account = this.options['account'];
    this.accounts = this.options['accounts'];
    this.get_last_reconciliation();
    this.newSubView = new MyMoney.Views.ReconciliationNewView({model: this.reconciliation, 
                                                               account: this.account});
    this.historySubView = new MyMoney.Views.ReconciliationHistoryView({collection: this.collection});
    this.listenTo(this.newSubView, "startReconcile", this.startReconcile);
  },

  get_last_reconciliation: function() {

    if (this.collection.length > 0) {
      this.last_reconciliation = _.first(this.collection.models);
      if (!this.last_reconciliation.get('reconciled')) {
        this.reconciliation = this.last_reconciliation;
        this.collection = _.rest(this.collection.models);
        this.last_reconciliation = _.first(this.collection.models);
      } else {
        this.reconciliation = new MyMoney.Models.Reconciliation;
        this.reconciliation.set({account_id: this.account.id});
      }

    } else {
      this.reconciliation = new MyMoney.Models.Reconciliation;
      this.reconciliation.set({account_id: this.account.id});
      this.last_reconciliation = null;
    }
    console.log('get_last_rec');
    console.log(this.reconciliation);
    console.log(this.last_reconciliation);
  },

  addHistorySubView: function() {
    this.$el.find('#reconciliation_history').html(this.historySubView.render().el);
  },

  addNewSubView: function() {
    this.$el.find('#new_reconciliation').html(this.newSubView.render().el);
  },

  startReconcile: function() {
console.log('startReconcile');
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addNewSubView();
    this.addHistorySubView();
    return this;
  }

});