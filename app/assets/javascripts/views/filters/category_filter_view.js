MyMoney.Views.CategoryFilterView = Backbone.View.extend({

  template: "filters/category_filter",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({
          category_id: this.options['category_id'], 
          categories: this.options['categories'],
          categoryTypes: this.options['categoryTypes']
        }));
    return this;
  }
});