MyMoney.Views.BankStatementEditView = MyMoney.Views.BaseEditView.extend({

  tagName: "tr",
  className: 'edit',
  template: 'import/bank_statement_edit',

  events: {
    "click #cancel": "cancelEdit",
    "click #delete": "deleteModel"
  },

  initialize: function() {
    this.account = this.options.account;
  },

  templateData: function(){
    return {};
  }
});
