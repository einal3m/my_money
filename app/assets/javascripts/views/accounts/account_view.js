
MyMoney.Views.AccountView = Backbone.View.extend({

  template: "accounts/account_row",

  tagName: "tr",

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  }
});