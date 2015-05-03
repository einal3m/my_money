MyMoney.Views.PatternEditView = MyMoney.Views.BaseEditView.extend({

  tagName: "tr",
  className: 'edit',
  template: "patterns/pattern_edit",

  events: {
    "change #category_id": "updateSubcategories",
    "click #cancel": "cancelEdit",
    "click #save": "saveModel",
    "click #delete": "deleteModel"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
    this.filteredSubcategories = this.subcategoriesForCategory(this.model.get('category_id'));
    this.model.saveState();
    this.listenTo(this.model, 'sync', this.closeEditView);
    if (this.collection) {
      this.listenTo(this.collection, 'sync', this.closeEditView);
    }
  },

  templateData: function(){
    return {
      pattern: this.model.toJSON(),
      allowDelete: !(this.model.isNew()),
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.filteredSubcategories
    };
  },

  setModelAttributes: function(){
    this.model.set({
      notes: this.$('#notes').val(),
      match_text: this.$('#match_text').val(),
      category_id: this.$('#category_id').val(),
      subcategory_id: this.$('#subcategory_id').val()
    });
  }

});