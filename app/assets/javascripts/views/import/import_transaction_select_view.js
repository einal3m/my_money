MyMoney.Views.ImportTransactionSelectView = MyMoney.Views.BaseTableView.extend({

  template: "import/import_transaction_select",

  events: {
    'click #upload' : 'importTransactions',
    'click #cancel' : 'cancel'
  },

  initialize: function() {
    this.account = this.options.account;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
    // _.bind(this.success, this);
    _.bindAll(this);
  },

  createTableRow: function(model){
    return new MyMoney.Views.ImportTransactionRowView({
      model: model,
      categories: this.categories,
      subcategories: this.subcategories,
      categoryTypes: this.categoryTypes
    });
  },

  filteredTransactions: function(){
    return new MyMoney.Collections.Transactions(
      this.collection.where({'import': true}),
      {account_id: this.account.id}
    );
  },

  importTransactions: function(){
    var filteredTransactions = this.filteredTransactions();
    if (filteredTransactions.length === 0) {
      alert('Please select some transactions to import');
    } else {
      filteredTransactions.save({success: this.success});
    }
  },

  success: function(){
    this.navigateToTransactions();
  },

  cancel: function(){
    this.navigateToTransactions();
  },

  navigateToTransactions: function(){
    window.router.navigate('accounts/' + this.account.id + '/transactions', {trigger: true});
  }
});
