MyMoney.Views.CategoryTypeTableView = MyMoney.Views.BaseTableView.extend({

  tagName: "div", 
  className: "category-type-table",

  template: "categories/category_type_table",

  events: {
    "click #new": "addModelView"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
  },

  templateData: function(){
    return this.model.toJSON();
  },

  addTableRows: function () {
    this.categories.each(function(category) {
      this.addCategoryRow(category);
      var subcategories = this.subcategories.sortByNameForCategory(category);
      subcategories.each(function(subcategory) {
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

  addModelView: function(){
    var newModel = new MyMoney.Models.Category({category_type_id: this.model.id});
    this.editView = new MyMoney.Views.CategoryEditView({
      model: newModel,
      collection: this.categories,
      categoryTypes: this.categoryTypes
    });
    this.$el.find('tbody').prepend(this.editView.render().el);
    this.$('#new').attr('disabled', 'disabled');
    this.listenTo(this.editView, 'editDone', this.afterEdit);
  },

  afterEdit: function(){
    this.$('#new').removeAttr("disabled");
    if (! this.editView.model.isNew()){
      this.addCategoryRow(this.editView.model);
    }
    this.trigger('rerender');
  }

  // editCategory: function(e){
  //   var category_row = $(e.currentTarget).closest('tr');
  //   if (this.isReadOnly(category_row)) { return; }

  //   var category = this.categories.get(category_row.attr('id'));
  //   var editRow = new MyMoney.Views.EditCategoryView({
  //     model: category,
  //     categoryTypes: this.categoryTypes
  //   });
  //   category_row.after(editRow.render().el);
  //   this.toggleReadOnly(category_row);
  //   this.listenTo(category, 'sync', this.dataChanged);
  //   this.listenTo(editRow, 'cancelEdit', this.rowCancelled);
  // },

  // editSubcategory: function(e){
  //   var subcategory_row = $(e.currentTarget).closest('tr');
  //   if (this.isReadOnly(subcategory_row)) { return; }

  //   var subcategory = this.subcategories.get(subcategory_row.attr('id'));
  //   var editRow = new MyMoney.Views.EditSubcategoryView({
  //     model: subcategory,
  //     categories: this.categories,
  //     categoryTypes: this.categoryTypes
  //   });
  //   subcategory_row.after(editRow.render().el);
  //   this.toggleReadOnly(subcategory_row);
  //   this.listenTo(subcategory, 'sync', this.dataChanged);
  //   this.listenTo(editRow, 'cancelEdit', this.rowCancelled);
  // },

  // newSubcategory: function(e){
  //   var subcategory_row = $(e.currentTarget).closest('tr');
  //   if (this.isReadOnly(subcategory_row)) { return; }

  //   var category_row = subcategory_row.prevUntil('.category').last().prev();
  //   var category = this.categories.get(category_row.attr('id'));
  //   var subcategory = new MyMoney.Models.Subcategory({ category_id: category.id });

  //   var editRow = new MyMoney.Views.EditSubcategoryView({
  //     model: subcategory,
  //     categories: this.categories,
  //     categoryTypes: this.categoryTypes,
  //     subcategories: this.subcategories
  //   });
  //   subcategory_row.after(editRow.render().el);
  //   this.toggleReadOnly(subcategory_row);
  //   this.listenTo(subcategory, 'sync', this.dataChanged);
  //   this.listenTo(editRow, 'cancelEdit', this.rowCancelled);
  // },

  // isReadOnly: function(row) {
  //   return row.hasClass('read-only');
  // },

  // toggleReadOnly: function(row) {
  //   row.toggleClass('read-only');
  // },

  // rowCancelled: function(modelCid, category_id) {
  //   var row = this.$el.find('#'+modelCid).closest('tr');
  //   if (row.length == 0) {
  //     var categoryCid = this.categories.get(category_id).cid;
  //     row = this.$el.find('#' + categoryCid).nextUntil('.new').last().next();
  //   }
  //   this.toggleReadOnly(row);
  // },

  // dataChanged: function(){
  //   window.router.categoryIndex();
  // }
});