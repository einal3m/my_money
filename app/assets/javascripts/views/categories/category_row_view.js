MyMoney.Views.CategoryRowView = Backbone.View.extend({

  template: "categories/category_row",
  tagName: "tr",
  className: 'category clickable',

  events: {
    "click": "toggleClickable"
  },

  initialize: function() {
    this.categoryTypes = this.options.categoryTypes;
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  },

  toggleClickable: function(e){
    e.preventDefault();
    e.stopPropagation();
    if (this.$el.hasClass('clickable')) {
      this.$el.removeClass('clickable');
      this.$el.addClass('editing');
      this.editModel();
    }
  },

  editModel: function(){
    this.editView = this.createEditView();
    this.listenTo(this.editView, 'cancel', this.editCancelled);
    this.renderEditView();
  },

  createEditView: function(){
    return new MyMoney.Views.CategoryEditView({
      model: this.model,
      collection: this.collection,
      categoryTypes: this.categoryTypes
    });
  },

  renderEditView: function(){
    this.$el.after(this.editView.render().el);
  },

  editCancelled: function(){
    this.$el.addClass('clickable');
    this.$el.removeClass('editing');
  }

});