MyMoney.Views.SubcategoryRowView = MyMoney.Views.BaseTableRowView.extend({

  template: "categories/subcategory_row",
  tagName: "tr",
  className: 'subcategory clickable',

  events: {
    "click": "toggleClickable"
  }, 

  initialize: function() {
    this.categories = this.options.categories;
    this.categoryTypes = this.options.categoryTypes;
  },

  templateData: function(){
    if (this.model.isNew()) {
      return { name: 'New...' };
    } else {
      return this.model.toJSON();
    }
  },

  createEditView: function(){
    return new MyMoney.Views.SubcategoryEditView({
      model: this.model,
      collection: this.collection,
      categories: this.categories,
      categoryTypes: this.categoryTypes
    });
  }

});
