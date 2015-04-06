MyMoney.Views.CategoryRowView = Backbone.View.extend({

  template: "categories/category_row",
  tagName: "tr",
  className: 'category',
  id: function(){ return this.model.cid },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  }
});