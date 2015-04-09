MyMoney.Views.EditSubcategoryView = Backbone.View.extend({

  template: "categories/edit_subcategory",
  tagName: "tr",
  className: 'subcategory',

  events: {
    "click #cancel": "removeView",
    "click #save": "saveSubcategory",
    "click #delete": "deleteSubcategory"
  },
  initialize: function(){
    this.categories = this.options['categories'];
    this.categoryTypes = this.options['categoryTypes'];
    this.subcategories = this.options['subcategories'];
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
      subcategory: this.model.toJSON(),
      categories: this.categories,
      categoryTypes: this.categoryTypes
    }));
    Backbone.Validation.bind(this);
    return this;
  },

  saveSubcategory: function(e){
    e.preventDefault();
    e.stopPropagation();

    this.model.set({category_id: this.$('#category_id').val()});
    this.model.set({name: this.$('#name').val()});

    if(this.model.isValid(true)){
      if (this.model.isNew()) {
        this.subcategories.create(this.model, { wait: true });
      } else {
        this.model.save({ }, { wait: true });
      }
    }
  },

  deleteSubcategory: function(e){
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
    this.trigger('cancelEdit', this.model.cid, this.model.get('category_id'));
    this.remove();
  }
});