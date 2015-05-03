MyMoney.Views.TransactionTableView = MyMoney.Views.BaseTableView.extend({

  tagName: "div", 
  className: "transaction_table",

  template: "transactions/transaction_table",

  events: {
    "click #new": "addNewView"
  },

  initialize: function() {
    this.account = this.options.account;
    this.categoryTypes = this.options.categoryTypes;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
  },

  templateData: function(){
    if (this.account) {
      return _.extend(this.account.toJSON(), {allowNew: true});
    } else {
      return {allowNew: false};
    }
  },

  createTableRow: function(model){
    return new MyMoney.Views.TransactionRowView({
      model: model,
      account: this.account,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
  },

  createNewView: function(){
    var newModel = new MyMoney.Models.Transaction({account_id: this.account.id});
    this.editView = new MyMoney.Views.TransactionEditView({
      model: newModel,
      collection: this.collection,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
  }

});
