MyMoney.Views.FooterView = Backbone.View.extend({

  tagName: "div",
  className: 'footer',
  template: "layout/footer",

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    return this;
  }
  
});
