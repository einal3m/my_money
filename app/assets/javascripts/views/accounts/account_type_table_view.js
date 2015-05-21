//= require ../base_table_view
MyMoney.Views.AccountTypeTableView = MyMoney.Views.BaseTableView.extend({

  tagName: "div", 
  className: "account-type-table",

  template: "accounts/account_type_table",

  initialize: function() {
    this.accounts = this.options.accounts;
  },

  templateData: function(){
    return this.model.toJSON();
  },

  createTableRow: function(model){
    return new MyMoney.Views.AccountRowView({
      model: model
    });
  }
});
