MyMoney.Views.CategoryRowView = MyMoney.Views.BaseTableRowView.extend({

  template: "categories/category_row",
  tagName: "tr",
  className: 'category clickable',

  events: {
    "click": "toggleClickable"
  },

  initialize: function() {
    this.categoryTypes = this.options.categoryTypes;
  },

  templateData: function(){
    return this.model.toJSON();
  },

  createEditView: function(){
    return new MyMoney.Views.CategoryEditView({
      model: this.model,
      collection: this.collection,
      categoryTypes: this.categoryTypes
    });
  }

});