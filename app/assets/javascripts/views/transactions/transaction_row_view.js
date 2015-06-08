
MyMoney.Views.TransactionRowView = MyMoney.Views.BaseTableRowView.extend({

  tagName: "tr",
  className: 'clickable',

  events: {
    "click": "toggleClickable"
  }, 

  initialize: function() {
    this.account = this.options.account;
    this.categoryTypes = this.options.categoryTypes;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.transactionTypes = this.options.transactionTypes;

    this.category = this.categories.get(this.model.get('category_id'));
    this.subcategory = this.subcategories.get(this.model.get('subcategory_id'));
    this.setTemplate();
  },
 
  setTemplate: function(){
    if (!this.account) {
      this.template = 'transactions/report_row';
      return;
    }
    if (this.account.isSavings()) { this.template = 'transactions/savings_row'; }
    if (this.account.isShare()) { this.template = 'transactions/shares_row'; }
  },

  templateData: function(){
    return _.extend(this.model.toJSON(), {
      category: this.category,
      subcategory: this.subcategory,
      isPurchase: this.isPurchase(),
      isSale: this.isSale(),
      isPriceUpdate: this.isPriceUpdate(),
      isDividend: this.isDividend()
    });
  },

// TODO: move to model
  isPurchase: function(){
    return (this.model.get('transaction_type_id') === 1);
  },
  isDividend: function(){
    return (this.model.get('transaction_type_id') === 2);
  },
  isPriceUpdate: function(){
    return (this.model.get('transaction_type_id') === 3);
  },
  isSale: function(){
    return (this.model.get('transaction_type_id') === 4);
  },

  createEditView: function(){
    return new MyMoney.Views.TransactionEditView({
      model: this.model,
      account: this.account,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories,
      transactionTypes: this.transactionTypes
    });
  }

});
