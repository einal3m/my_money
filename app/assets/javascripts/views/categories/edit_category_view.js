MyMoney.Views.EditCategoryView = Backbone.View.extend({

  template: "categories/edit_category",
  tagName: "tr",

  events: {
    "click #cancel": "removeView",
    "click #save": "saveCategory",
    "click #delete": "deleteCategory"
  },

  initialize: function(){
    this.categoryTypes = this.options['categoryTypes'];
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
      category: this.model.toJSON(),
      categoryTypes: this.categoryTypes
    }));
    Backbone.Validation.bind(this);
    return this;
  },

  saveCategory: function(e){
    e.preventDefault();
    e.stopPropagation();

    this.model.set({category_type_id: this.$('#category_type_id').val()});
    this.model.set({name: this.$('#name').val()});

    if(this.model.isValid(true)){
      this.model.save({ }, { wait: true });
    }
  },

  deleteCategory: function(e){
    var r = confirm('Are you sure you want to delete this ' + this.model.name + '?');
    if (r == true) {
      this.model.destroy({ wait: true, error: this.deleteError });
    }

  },

  deleteError: function(model, response){
    this.$('.form-footer').addClass('has-error');
    this.$('.form-footer .help-block').text('Delete Error: ' + response.responseText);
    this.$('.form-footer .help-block').removeClass('hidden');
  },

  removeView: function(){
    this.trigger('cancelEdit', this.model.cid);
    this.remove();
  }
});