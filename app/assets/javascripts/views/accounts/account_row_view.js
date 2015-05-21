
MyMoney.Views.AccountRowView = Backbone.View.extend({

  tagName: "tr",
  className: 'clickable',

  events: {
    "click #show": "showAccount",
    "click": "showTransactions"
  },

  render: function(){
    this.setTemplate();
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  },

  setTemplate: function(){
    if (this.model.isSavings()) { this.template = 'accounts/savings_row'; }
    if (this.model.isShare()) { this.template = 'accounts/shares_row'; }
  },

  showTransactions: function(e){
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('accounts/' + this.model.id + '/transactions', {trigger: true});
  },

  showAccount: function(e){
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('accounts/' + this.model.id + '/show', {trigger: true});
  }
});