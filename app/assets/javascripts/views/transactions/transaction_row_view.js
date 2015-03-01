
MyMoney.Views.TransactionRowView = Backbone.View.extend({

  template: "transactions/transaction_row",
  tagName: "tr",

  initialize: function() {
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.category = this.categories.get(this.model.get('category_id'));
    this.subcategory = this.subcategories.get(this.model.get('subcategory_id'));
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
      transaction: this.model.toJSON(),
      category: this.category,
      subcategory: this.subcategory
    }));
    return this;
  }
});