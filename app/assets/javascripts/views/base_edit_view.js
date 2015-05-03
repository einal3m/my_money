//= require ./base_view.js

MyMoney.Views.BaseEditView = MyMoney.Views.BaseView.extend({

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.templateData()));
    Backbone.Validation.bind(this);
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
      this.model.destroy({ wait: true, error: this.deleteError });
    }
  },

  deleteError: function(model, response){
    this.$('.form-footer').addClass('has-error');
    this.$('.form-footer .help-block').text('Delete Error: ' + response.responseText);
    this.$('.form-footer .help-block').removeClass('hidden');
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
  }

});
