MyMoney.Views.HeaderView = Backbone.View.extend({

  tagName: "div",
  className: 'header',
  template: "layout/header",

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    return this;
  }

});
