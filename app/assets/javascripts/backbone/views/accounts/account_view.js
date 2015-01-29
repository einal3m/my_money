
MyMoney.Views.AccountView = Backbone.View.extend({

  template: JST["backbone/templates/accounts/account"],

  tagName: "tr",

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});