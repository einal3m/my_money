MyMoney.Views.CategoryFilterView = Backbone.View.extend({

  template: "filters/category_filter",

  events: {
    "change #category_id": "updateSubcategories"
  },

  initialize: function() {
    this.categories = this.options['categories'];
    this.category_id = this.options['category_id'];
    this.subcategory_id = this.options['subcategory_id'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
    this.set_current_subcategories();
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
      category_id: this.category_id,
      categories: this.categories,
      subcategory_id: this.subcategory_id,
      subcategories: this.current_subcategories,
      categoryTypes: this.categoryTypes,
      hasSubcategories: this.hasSubcategories()
    }));
    return this;
  },

  set_current_subcategories: function() {
    if (this.hasSubcategories && this.category_id) {
      this.current_subcategories = this.subcategories.where({category_id: parseInt(this.category_id)});
    } else {
      this.current_subcategories = null;
    }
  },

  updateSubcategories: function() {
    if (this.hasSubcategories) {
      this.category_id = parseInt(this.$('#category_id').val());
      this.set_current_subcategories();
      var html = selectContent(this.current_subcategories, null);
      this.$el.find('#subcategory_id').html(html);
    }
  },

  hasSubcategories: function(){
    return this.subcategories ? true : false;
  }
});