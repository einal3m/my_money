MyMoney.Views.CategoryEditView = Backbone.View.extend({

  tagName: "tr",
  template: "categories/edit_category",
 
  events: {
    "click #cancel": "cancelEdit",
    "click #save": "saveModel",
    "click #delete": "deleteModel"
  },

  initialize: function(){
    _.bindAll(this);
    this.categoryTypes = this.options.categoryTypes;
    this.model.saveState();
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.templateData()));
    Backbone.Validation.bind(this);
    return this;
  },

  templateData: function(){
    return {
      category: this.model.toJSON(),
      allowDelete: !(this.model.isNew()),
      categoryTypes: this.categoryTypes,
    };
  },

  saveModel: function(){
    this.model.set({
      category_type_id: parseInt(this.$('#category_type_id').val()),
      name: this.$('#name').val()
    });

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
