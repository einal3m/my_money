
MyMoney.Views.CategoryIndexView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "categories/category_index",

  initialize: function() {
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
    this.categories.on('add destroy change', this.render, this);
    this.subcategories.on('add destroy change', this.render, this);
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());

    _(['Income', 'Expense']).each(function(type) {
      var categoryType = this.categoryTypes.where({name: type})[0];
      var tableView = this.addSubView(type + '_categories', new MyMoney.Views.CategoryTypeTableView({
        model: categoryType,
        categoryTypes: this.categoryTypes,
        categories: this.categories.sortByNameForCategoryType(categoryType), 
        subcategories: this.subcategories
      }));
    }, this);
    this.renderSubViews();

    return this;
  },

});
