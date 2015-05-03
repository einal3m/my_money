
MyMoney.Views.TransactionRowView = MyMoney.Views.BaseTableRowView.extend({

  template: "transactions/transaction_row",
  tagName: "tr",
  className: 'clickable',

  events: {
    "click": "toggleClickable"
  }, 

  initialize: function() {
    this.categoryTypes = this.options.categoryTypes;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;

    this.category = this.categories.get(this.model.get('category_id'));
    this.subcategory = this.subcategories.get(this.model.get('subcategory_id'));
  },
 
  templateData: function(){
    return _.extend(this.model.toJSON(), {
      category: this.category,
      subcategory: this.subcategory
    });
  },

  createEditView: function(){
    return new MyMoney.Views.TransactionEditView({
      model: this.model,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
  }

});
