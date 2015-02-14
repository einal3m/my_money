MyMoney.Views.ReconciliationView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",
  template: "reconciliations/reconciliation",

  events: {
    'click [type="checkbox"]': 'toggleTransaction',
    'click #done' : 'finishReconcile'
  },

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

    var last_reconciliation = null;

    if (this.collection.length > 0) {
      this.model = this.collection.models[0];
      if (!this.model.get('reconciled')) {
        last_reconciliation = this.collection.models[1];
      } else {
        last_reconciliation = this.collection.models[0];
        this.model = new MyMoney.Models.Reconciliation;
        this.model.set({account_id: this.account.id});
      }
    } else {
      this.model = new MyMoney.Models.Reconciliation;
      this.model.set({account_id: this.account.id});
    }

    if (last_reconciliation) {
      this.reconciliation_balance = last_reconciliation.get('statement_balance');
    } else {
      this.reconciliation_balance = this.account.get('starting_balance');
    }
    console.log('get_last_rec');
    console.log(this.model);
    console.log(last_reconciliation);
    console.log(this.reconciliation_balance);
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
      if (reconcile) {
        this.reconciliation_balance += this.transactions.models[i].get('amount');
      }
    }
    this.balance_difference = this.model.get('statement_balance') - this.reconciliation_balance;
  },

  update_reconciliation_balance: function(amount, add) {
    if (add) {
      this.reconciliation_balance += amount;
    } else {
      this.reconciliation_balance -= amount;
    }
    this.balance_difference = this.model.get('statement_balance') - this.reconciliation_balance;
    console.log(this.balance_difference);
    console.log(this.reconciliation_balance);
    this.$('#reconciliation_balance').html(accountingFormat(centsToDollars(this.reconciliation_balance)));
    this.$('#balance_difference').html(accountingFormat(centsToDollars(this.balance_difference)));
  },

  toggleTransaction: function(e) {
    e.stopPropagation();

    var checked = e.currentTarget.checked;
    var id = e.currentTarget.id;
    var model = this.transactions.get(id);

    this.update_reconciliation_balance(model.get('amount'), checked)
    model.set('reconciled', checked);
  },

  startReconcile: function() {
    var that = this;
    this.panel1SubView.remove();
    this.panel2SubView.remove();
    this.transactions = new MyMoney.Collections.TransactionsCollection([], {account_id: account.id});
    $.when(this.transactions.fetch()).done(function () {
      that.set_reconciled_state();
      that.panel2SubView = new MyMoney.Views.ReconciliationTransactionsView({model: that.model, collection: that.transactions});
      that.addPanel2SubView();
      that.panel1SubView = new MyMoney.Views.ReconciliationPanelView({model: that.model, 
                                account: that.account, 
                                reconciliation_balance: that.reconciliation_balance,
                                balance_difference: that.balance_difference});
      that.addPanel1SubView();
    });  
  },

  reconciled_transactions: function() {
    var transactions = new MyMoney.Collections.TransactionsCollection();
    for (i = 0; i < this.transactions.length; i++) { 
      var transaction = this.transactions.models[i];
      if (transaction.get('reconciled')) {
        transaction.set('reconciliation_id', this.model.get('id'));
        transactions.add(transaction);
      }
    }
    return transactions;
  },

  goToAccount: function() {
      window.router.navigate('accounts/' + this.model.get('account_id') + '/show', {trigger: true})
  },

  finishReconcile: function() {
console.log("finish reconcile");
    this.model.set('reconciled', true);
    this.model.set('transactions', this.reconciled_transactions());
    this.model.save({}, { wait: true, done: this.goToAccount() });
  }
});