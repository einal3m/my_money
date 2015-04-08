
MyMoney.Views.CategoryIndexView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

  template: "categories/category_index",

  events: {
    "click .category i": "editCategory",
    "click .subcategory i": "editSubcategory",
    "click .new i": "newSubcategory"
  },

  initialize: function() {
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
    this.listenTo(this.subcategories, 'add', this.dataChanged);
  },

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
          view.addNewSubcategoryRow(category, type);
      });
    });
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

  addNewSubcategoryRow: function(category, type){
    var rowView = new MyMoney.Views.NewSubcategoryView({
      category: category,
      subcategories: this.subcategories
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
    var category_row = $(e.currentTarget).closest('tr');
    if (this.isReadOnly(category_row)) { return; }

    var category = this.categories.get(category_row.attr('id'));
    var editRow = new MyMoney.Views.EditCategoryView({
      model: category,
      categoryTypes: this.categoryTypes
    });
    category_row.after(editRow.render().el);
    this.toggleReadOnly(category_row);
    this.listenTo(category, 'sync', this.dataChanged);
    this.listenTo(editRow, 'cancelEdit', this.rowCancelled);
  },

  editSubcategory: function(e){
    var subcategory_row = $(e.currentTarget).closest('tr');
    if (this.isReadOnly(subcategory_row)) { return; }

    var subcategory = this.subcategories.get(subcategory_row.attr('id'));
    var editRow = new MyMoney.Views.EditSubcategoryView({
      model: subcategory,
      categories: this.categories,
      categoryTypes: this.categoryTypes
    });
    subcategory_row.after(editRow.render().el);
    this.toggleReadOnly(subcategory_row);
    this.listenTo(subcategory, 'sync', this.dataChanged);
    this.listenTo(editRow, 'cancelEdit', this.rowCancelled);
  },

  newSubcategory: function(e){
    var subcategory_row = $(e.currentTarget).closest('tr');
    if (this.isReadOnly(subcategory_row)) { return; }

    var category_row = subcategory_row.prevUntil('.category').last().prev();
    var category = this.categories.get(category_row.attr('id'));
    var subcategory = new MyMoney.Models.Subcategory({ category_id: category.id });

    var editRow = new MyMoney.Views.EditSubcategoryView({
      model: subcategory,
      categories: this.categories,
      categoryTypes: this.categoryTypes,
      subcategories: this.subcategories
    });
    subcategory_row.after(editRow.render().el);
    this.toggleReadOnly(subcategory_row);
    this.listenTo(subcategory, 'sync', this.dataChanged);
    this.listenTo(editRow, 'cancelEdit', this.rowCancelled);
  },

  isReadOnly: function(row) {
    return row.hasClass('read-only');
  },

  toggleReadOnly: function(row) {
    row.toggleClass('read-only');
  },

  rowCancelled: function(modelCid, category_id) {
    var row = this.$el.find('#'+modelCid).closest('tr');
    if (row.length == 0) {
      var categoryCid = this.categories.get(category_id).cid;
      row = this.$el.find('#' + categoryCid).nextUntil('.new').last().next();
    }
    this.toggleReadOnly(row);
  },

  dataChanged: function(){
    window.router.categoryIndex();
  }
});