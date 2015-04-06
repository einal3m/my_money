
MyMoney.Views.CategoryIndexView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

  template: "categories/category_index",

  events: {
    "click .category": "editCategory",
    "click .subcategory": "editSubcategory"
  },

  initialize: function() {
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
  },

  // addAll: function(){
  //     for (var i = 0; i < this.collection.length; i++) { 
  //       this.addOne(this.collection.models[i]);
  //     }
  // },

  // addOne: function(model){
  //     var rowView = new MyMoney.Views.AccountView({model: model});
  //     this.$el.find('tbody').append(rowView.render().el);
  // },

  // addNetWorth: function(){
  //   var netWorthView = new MyMoney.Views.AccountsNetWorthView({collection: this.collection});
  //   this.$el.find('tbody').append(netWorthView.render().el);
  // },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    var view = this;
    _(['Income', 'Expense']).each(function(type) {
      var categories = view.sortedCategories(type);
      _.each(categories, function(category) {
          view.addCategoryRow(category, type);
          var subcategories = view.sortedSubcategories(category);
          _.each(subcategories, function(subcategory) {
            view.addSubcategoryRow(subcategory, type);
          });
      });
    });
    // this.addAll();
    // this.addNetWorth();
    return this;
  },

  addCategoryRow: function(category, type){
    var rowView = new MyMoney.Views.CategoryRowView({
      model: category
    });
    this.$el.find('#' + type + '_table').append(rowView.render().el);
  },

  addSubcategoryRow: function(subcategory, type){
    var rowView = new MyMoney.Views.SubcategoryRowView({
      model: subcategory
    });
    this.$el.find('#' + type + '_table').append(rowView.render().el);
  },

  sortedCategories: function(type) {
    var categoryType = this.categoryTypes.where({name: type})[0];
    var categories = this.categories.where({category_type_id: categoryType.id});
    return _.sortBy(categories, function(category) { return category.get('name'); });
  },

  sortedSubcategories: function(category) {
    var subcategories = this.subcategories.where({category_id: category.id});
    return _.sortBy(subcategories, function(subcategory) { return subcategory.get('name'); });
  },

  editCategory: function(e){
    category = this.categories.get(e.currentTarget.id);
    var editRow = new MyMoney.Views.EditCategoryView({
      model: category,
      categoryTypes: this.categoryTypes
    });
    category_row = this.$el.find('#'+e.currentTarget.id).closest('tr');
    category_row.after(editRow.render().el);
    this.listenTo(category, 'sync', this.dataChanged);
  },

  editSubcategory: function(e){
    subcategory = this.subcategories.get(e.currentTarget.id);
    var editRow = new MyMoney.Views.EditSubcategoryView({
      model: subcategory,
      categories: this.categories,
      categoryTypes: this.categoryTypes
    });
    subcategory_row = this.$el.find('#'+e.currentTarget.id).closest('tr');
    subcategory_row.after(editRow.render().el);
    this.listenTo(subcategory, 'sync', this.dataChanged);
  },

  dataChanged: function(){
    window.router.categoryIndex();
  }
});