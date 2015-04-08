MyMoney.Views.NewSubcategoryView = Backbone.View.extend({

  template: "categories/new_subcategory",
  tagName: "tr",
  className: 'new',

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    return this;
  }
});