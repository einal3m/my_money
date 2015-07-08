MyMoney.Views.ImportTransactionRowView = Backbone.View.extend({

  template: "import/import_transaction_row",
  tagName: "tr",

  events: {
    "change #category_id": "categorySelected",
    "change #subcategory_id": "updateSubcategory",
    "change #notes": "updateNotes",
    "click #import": "updateImport"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
    this.updateSubcategoryFilter(this.model.get('category_id'));
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
      transaction: this.model.toJSON(),
      categories: this.categories,
      subcategories: this.filteredSubcategories,
      categoryTypes: this.categoryTypes
    }));

    if (this.model.get('duplicate')) {
      this.$el.addClass('danger');
    }
    return this;
  },
  
  updateSubcategoryFilter: function(category_id){
    this.filteredSubcategories = this.subcategoriesForCategory(category_id);
  },

  // TODO move this to subcategory collection
  subcategoriesForCategory: function(category_id) {
    if (category_id) {
      return this.subcategories.where({category_id: category_id});
    }
    return null;
  },

  categorySelected: function(){
    var category_id = parseInt(this.$('#category_id').val(), 10);
    this.model.set({category_id: category_id});
    this.model.set({subcategory_id: null});
    
    this.updateSubcategoryFilter(category_id);
    this.renderSubcategories();
  },

  updateNotes: function() {
    this.model.set({notes: this.$('#notes').val()});
  },

  updateSubcategory: function() {
    this.model.set('subcategory_id', parseInt(this.$('#subcategory_id').val(), 10));
  },

  updateImport: function(e){
    this.model.set('import', e.currentTarget.checked);
  },

  renderSubcategories: function(){
    var html = selectContent(this.filteredSubcategories, null, true);
    this.$el.find('#subcategory_id').html(html);
  }

});