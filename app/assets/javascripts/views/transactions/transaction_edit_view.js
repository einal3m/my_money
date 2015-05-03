MyMoney.Views.TransactionEditView = MyMoney.Views.BaseEditView.extend({

  template: "transactions/transaction_edit",
  tagName: "tr",
  className: 'edit',

  events: {
    "change #category_id": "updateSubcategories",
    "click #cancel": "cancelEdit",
    "click #save": "saveModel",
    "click #delete": "deleteModel"
  },

  initialize: function() {
    this.categoryTypes = this.options.categoryTypes;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.filteredSubcategories = this.subcategoriesForCategory(this.model.get('category_id'));
  },

  templateData: function(){
    return _.extend(this.model.toJSON(), {
      allowDelete: !this.model.isNew(),
      categories: this.categories,
      subcategories: this.filteredSubcategories,
      categoryTypes: this.categoryTypes
    });
  },

  setModelAttributes: function(){
    this.model.set({
      date: this.$('#date').val(),
      amount: dollarsToCents(this.$('#amount').val()),
      category_id: parseInt(this.$('#category_id').val(), 10),
      subcategory_id: parseInt(this.$('#subcategory_id').val(), 10),
      notes: this.$('#notes').val()
    });
  }

});
