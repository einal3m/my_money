
MyMoney.Views.AccountShowView = Backbone.View.extend({

	template: "accounts/account_show",

  events: {
    "click #edit": "editAccount"
  },

  initialize: function(){
    this.accountType = this.options.accountType;
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  },

  editAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.trigger('edit');
  }

});