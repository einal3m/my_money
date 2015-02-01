
MyMoney.Views.AccountShowView = Backbone.View.extend({

	template: "accounts/account_show",

  events: {
    "click #edit": "editAccount"
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  },

  editAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.trigger('editAccount');
  }

});