MyMoney.Views.PatternTableRowView = MyMoney.Views.BaseTableRowView.extend({

  tagName: "tr",
  className: "clickable",
  template: "patterns/pattern_table_row",

  events: {
    "click": "toggleClickable"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
  },

  templateData: function(){
    var category = this.categories.get(this.model.get('category_id'));
    var subcategory = this.subcategories.get(this.model.get('subcategory_id'));

    return _.extend(this.model.toJSON(), {
      category_name: category ? category.get('name') : '',
      subcategory_name: subcategory ? subcategory.get('name') : ''
    });
  },

  createEditView: function(){
    return new MyMoney.Views.PatternEditView({
      model: this.model,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
  }

});
