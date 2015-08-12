MyMoney.Views.BankStatementsTableView = MyMoney.Views.BaseTableView.extend({

  tagName: "div", 
  className: "bank_statements_table",

  template: "import/bank_statements_table",

  initialize: function() {
    this.account = this.options.account;
  },

  createTableRow: function(model){
    return new MyMoney.Views.BankStatementRowView({
      model: model,
      account: this.account
    });
  }
});
