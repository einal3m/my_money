MyMoney.Views.SubcategoryRowView = Backbone.View.extend({

  template: "categories/subcategory_row",
  tagName: "tr",
  className: 'subcategory clickable',

  events: {
    "click": "toggleClickable"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.categoryTypes = this.options.categoryTypes;
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.templateData()));
    return this;
  },

  templateData: function(){
    if (this.model.isNew()) {
      return { name: 'New...' };
    } else {
      return this.model.toJSON();
    }
  },

  toggleClickable: function(e){
    e.preventDefault();
    e.stopPropagation();
    if (this.$el.hasClass('clickable')) {
      this.$el.removeClass('clickable');
      this.editModel();
    }
  },

  editModel: function(){
    this.editView = this.createEditView();
    this.listenTo(this.editView, 'cancel', this.editCancelled);
    this.renderEditView();
  },

  createEditView: function(){
    return new MyMoney.Views.SubcategoryEditView({
      model: this.model,
      collection: this.collection,
      categories: this.categories,
      categoryTypes: this.categoryTypes
    });
  },

  renderEditView: function(){
    this.$el.after(this.editView.render().el);
  },

  editCancelled: function(){
    this.$el.addClass('clickable');
  }

});
