MyMoney.Views.BankStatementRowView = MyMoney.Views.BaseTableRowView.extend({

  tagName: "tr",
  className: 'clickable',
  template: 'import/bank_statement_row',

  events: {
    "click": "toggleClickable"
  }, 

  initialize: function() {
    this.account = this.options.account;
  },
 
  templateData: function(){
    return this.model.toJSON();
  },

  createEditView: function(){
    return new MyMoney.Views.BankStatementEditView({
      model: this.model,
      account: this.account
    });
  }
});
