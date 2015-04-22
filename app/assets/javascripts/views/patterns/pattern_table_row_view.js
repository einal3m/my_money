MyMoney.Views.PatternTableRowView = MyMoney.Views.BaseView.extend({

  tagName: "tr",
  className: "clickable",
  template: "patterns/pattern_table_row",

  events: {
    "click": "toggleClickable"
  },

  initialize: function() {
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.templateData()));
    return this;
  },

  templateData: function(){
    var category = this.categories.get(this.model.get('category_id'));
    var subcategory = this.subcategories.get(this.model.get('subcategory_id'));

    return _.extend(this.model.toJSON(), {
      category_name: category ? category.get('name') : '',
      subcategory_name: subcategory ? subcategory.get('name') : ''
    });
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
    this.renderEditView();
    this.listenTo(this.editView, 'cancelEdit', this.afterEdit);
  },

  createEditView: function(){
    return new MyMoney.Views.PatternEditView({
      model: this.model,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
  },

  renderEditView: function(){
    this.$el.after(this.editView.render().el);
  },

  afterEdit: function(){
    this.$el.addClass('clickable');
    if (this.model.isDestroyed()){
      this.remove();
    } else {
      this.render();
    }
  }
});
