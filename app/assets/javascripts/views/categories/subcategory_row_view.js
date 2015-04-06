MyMoney.Views.SubcategoryRowView = Backbone.View.extend({

  template: "categories/subcategory_row",
  tagName: "tr",
  className: 'subcategory',
  id: function(){ return this.model.cid },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  }
});