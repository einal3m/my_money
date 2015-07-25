//= require ./base_view.js

MyMoney.Views.BaseEditView = MyMoney.Views.BaseView.extend({

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.templateData()));
    Backbone.Validation.bind(this);
    _.bindAll(this, 'saveError', 'deleteError');
    return this;
  },

  // TODO: put this in subcategory collection
  subcategoriesForCategory: function(category_id) {
    if (category_id) {
      return this.subcategories.where({category_id: category_id});
    }
    return null;
  },

  updateSubcategories: function() {
    var category_id = parseInt(this.$('#category_id').val(), 10);
    this.filteredSubcategories = this.subcategoriesForCategory(category_id);
    var html = selectContent(this.filteredSubcategories, null, true);
    this.$el.find('#subcategory_id').html(html);
  },

  saveModel: function(){
    this.setModelAttributes();
    
    if(this.model.isValid(true)){
      if (this.model.isNew()){
        this.collection.create(this.model, { wait: true, error: this.saveError });
      } else {
        this.model.save({ }, { wait: true, error: this.saveError });
      }
    }
  },

  deleteModel: function(e){
    e.preventDefault();
    e.stopPropagation();

    if (this.confirmDelete()) {
      this.model.destroy({ wait: true, error: this.deleteError });
    }
  },

  saveError: function(model, response, options) {
    this.showError(response);
  },

  deleteError: function(model, response){
    this.showError(response);
  },

  confirmDelete: function(){
    return confirm('Are you sure you want to delete this ' + this.model.name + '?');
  },

  cancelEdit: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.model.restoreSavedState();
    this.remove();
    this.trigger('cancel');
  },

  showError: function(response){
    this.errorEl().removeClass('hidden');
    var json = JSON.parse(response.responseText);
    this.errorMessageEl().html(json.message);
  },

  errorEl: function(){
    return this.$('.errors');
  },

  errorMessageEl: function(){
    return this.$('.errors .alert-message');
  }

});
