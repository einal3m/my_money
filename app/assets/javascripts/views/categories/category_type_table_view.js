MyMoney.Views.CategoryTypeTableView = MyMoney.Views.BaseTableView.extend({

  tagName: "div", 
  className: "category-type-table",

  template: "categories/category_type_table",

  events: {
    "click #new": "addNewView"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.filteredCategories = this.options.filteredCategories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
  },

  templateData: function(){
    return this.model.toJSON();
  },

  addTableRows: function () {
    this.filteredCategories.each(function(category) {
      this.addCategoryRow(category);
      var filteredSubcategories = this.subcategories.findByCategory(category);
      filteredSubcategories.each(function(subcategory) {
        this.addSubcategoryRow(subcategory);
      }, this);
      this.addNewSubcategoryRow(category);
    }, this);
  },

  addCategoryRow: function(category){
    var rowView = new MyMoney.Views.CategoryRowView({
      model: category,
      collection: this.categories,
      categoryTypes: this.categoryTypes
    });
    this.$el.find('tbody').append(rowView.render().el);
  },

  addSubcategoryRow: function(subcategory){
    var rowView = new MyMoney.Views.SubcategoryRowView({
      model: subcategory,
      collection: this.subcategories,
      categories: this.categories,
      categoryTypes: this.categoryTypes
    });
    this.$el.find('tbody').append(rowView.render().el);
  },

  addNewSubcategoryRow: function(category){
    var rowView = new MyMoney.Views.SubcategoryRowView({
      model: new MyMoney.Models.Subcategory({category_id: category.id}),
      collection: this.subcategories,
      categories: this.categories,
      categoryTypes: this.categoryTypes
    });
    this.$el.find('tbody').append(rowView.render().el);
  },

  createNewView: function(){
    var newModel = new MyMoney.Models.Category({category_type_id: this.model.id});
    this.editView = new MyMoney.Views.CategoryEditView({
      model: newModel,
      collection: this.categories,
      categoryTypes: this.categoryTypes
    });
  }

});
