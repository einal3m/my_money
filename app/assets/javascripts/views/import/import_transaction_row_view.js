MyMoney.Views.ImportTransactionRowView = Backbone.View.extend({

  template: "import/import_transaction_row",
  tagName: "tr",

  events: {
    "change #category_id": "updateSubcategorySelect",
    "change #subcategory_id": "updateSubcategory"
  },

  initialize: function() {
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
    this.set_current_subcategories();
  },
  
  set_current_subcategories: function() {
    if (this.model.get('category_id')) {
      this.current_subcategories = this.subcategories.where({category_id: this.model.get('category_id')});
    } else {
      this.current_subcategories = null;
    }
  },

  updateSubcategorySelect: function() {
    this.model.set('category_id', parseInt(this.$('#category_id').val()));
    this.set_current_subcategories();
    var html = selectContent(this.current_subcategories, null);
    this.$el.find('#subcategory_id').html(html);
  },

  updateSubcategory: function() {
    this.model.set('subcategory_id', parseInt(this.$('#subcategory_id').val()));
  },

  render: function(){
    this.model.set('cid', this.model.cid);
    this.$el.html(HandlebarsTemplates[this.template]({
      transaction: this.model.toJSON(),
      categories: this.categories,
      subcategories: this.current_subcategories,
      categoryTypes: this.categoryTypes
    }));

    if (this.model.get('duplicate')) {
      this.$el.addClass('danger');
    }
    return this;
  }
});