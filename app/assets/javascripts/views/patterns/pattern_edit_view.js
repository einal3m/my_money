MyMoney.Views.PatternEditView = MyMoney.Views.BaseView.extend({

  tagName: "tr",
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
    this.viewSubcategories = this.subcategoriesForCategory(this.model.get('category_id'));
    this.model.saveState();
    this.listenTo(this.model, 'sync', this.closeEditView);
    if (this.collection) {
      this.listenTo(this.collection, 'sync', this.closeEditView);
    }
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.templateData()));
    Backbone.Validation.bind(this);
    return this;
  },

  templateData: function(){
    return {
      pattern: this.model.toJSON(),
      allowDelete: !(this.model.isNew()),
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.viewSubcategories
    };
  },

  subcategoriesForCategory: function(category_id) {
    if (category_id) {
      return this.subcategories.where({category_id: category_id});
    }
    return null;
  },

  updateSubcategories: function() {
    var category_id = parseInt(this.$('#category_id').val());
    this.viewSubcategories = this.subcategoriesForCategory(category_id);
    var html = selectContent(this.viewSubcategories, null, true);
    this.$el.find('#subcategory_id').html(html);
  },

  cancelEdit: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.model.restoreSavedState();
    this.closeEditView();
  },

  saveModel: function(){
    this.model.set({
      notes: this.$('#notes').val(),
      match_text: this.$('#match_text').val(),
      category_id: this.$('#category_id').val(),
      subcategory_id: this.$('#subcategory_id').val()
    })

    if(this.model.isValid(true)){
      if (this.model.isNew()){
        this.collection.create(this.model, { wait: true });
      } else {
        this.model.save({ }, { wait: true });
      }
    }
  },

  deleteModel: function(e){
    e.preventDefault();
    e.stopPropagation();

    if (this.confirmDelete()) {
      this.model.destroy({ wait: true });
      this.model.setDestroyed();
    }
  },

  confirmDelete: function(){
    return confirm('Are you sure you want to delete this ' + this.model.name + '?');
  },

  closeEditView: function(){
    this.remove();
    this.trigger('cancelEdit');
  }

});