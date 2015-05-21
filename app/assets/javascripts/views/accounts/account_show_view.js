
MyMoney.Views.AccountShowView = Backbone.View.extend({

  events: {
    "click #edit": "editAccount"
  },

  initialize: function(){
    this.accountType = this.options.accountType;
  },

  render: function () {
    this.setTemplate();
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  },

  setTemplate: function(){
    if (this.model.isSavings()) { this.template = 'accounts/savings_show'; }
    if (this.model.isShare()) { this.template = 'accounts/shares_show'; }
  },

  editAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.trigger('edit');
  }

});