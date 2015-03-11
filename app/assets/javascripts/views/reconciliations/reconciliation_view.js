MyMoney.Views.ReconciliationView = MyMoney.Views.BaseView.extend({

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
    this.get_this_reconciliation();
    this.addSubView('panel1', new MyMoney.Views.ReconciliationNewView({model: this.model, 
                                                               account: this.account}));
    this.addSubView('panel2', new MyMoney.Views.ReconciliationHistoryView({collection: this.collection}));
    this.listenTo(this.subViews['panel1'], "startReconcile", this.startReconcile);
  },

  get_this_reconciliation: function() {

    var last_reconciliation = null;

    if (this.collection.length > 0) {
      this.model = this.collection.models[0];
      if (!this.model.get('reconciled')) {
        last_reconciliation = this.collection.models[1];
      } else {
        last_reconciliation = this.collection.models[0];
        this.get_new_reconciliation();
      }
    } else {
      this.get_new_reconciliation();
    }

    this.get_reconciliation_balance(last_reconciliation);
  },

  get_new_reconciliation: function() {
    this.model = new MyMoney.Models.Reconciliation;
    this.model.set({account_id: this.account.id});
  },

  get_reconciliation_balance: function(last_reconciliation) {
    if (last_reconciliation) {
      this.reconciliation_balance = last_reconciliation.get('statement_balance');
    } else {
      this.reconciliation_balance = this.account.get('starting_balance');
    }
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    this.renderSubViews();
    return this;
  },

  set_reconciled_state: function() {
    var statement_date = new Date(this.model.get('statement_date'));
    for (var i = 0; i < this.transactions.length; i++) { 
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
    this.checkDone();
  },

  startReconcile: function() {
    var that = this;
    this.transactions = new MyMoney.Collections.TransactionsCollection([], {account_id: account.id, action: 'reconcile'});
    $.when(this.transactions.fetch()).done(function () {
      that.set_reconciled_state();
      that.addSubView('panel2', new MyMoney.Views.ReconciliationTransactionsView({model: that.model, collection: that.transactions}));
      that.addSubView('panel1', new MyMoney.Views.ReconciliationPanelView({model: that.model, 
                                account: that.account, 
                                reconciliation_balance: that.reconciliation_balance,
                                balance_difference: that.balance_difference}));
      that.renderSubViews();
      that.checkDone();
    });  
  },

  checkDone: function() {
    var done = (this.balance_difference == 0) && (this.reconciled_transactions().length > 0) 
    this.$('#done').prop('disabled', !done);
  },

  reconciled_transactions: function() {
    var transactions = new MyMoney.Collections.TransactionsCollection();
    for (var i = 0; i < this.transactions.length; i++) { 
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
    this.model.set('reconciled', true);
    this.model.set('transactions', this.reconciled_transactions());
    this.model.save({}, { wait: true, done: this.goToAccount() });
  }
});