//= require ../base_edit_view
MyMoney.Views.AccountFormView = MyMoney.Views.BaseEditView.extend({

  tagName: "div", 
  className: "accounts",

  template: 'accounts/savings_form',

  events: {
    "click #cancel": "cancelEdit",
    "click #save": "saveModel"
  },

  initialize: function(){
    this.setTemplate();
  },

  templateData: function(){
    return this.model.toJSON();
  },

  setModelAttributes: function(){
    if (this.model.isSavings()) { this._setSavingsAttributes(); }
    if (this.model.isShare()) { this._setSharesAttributes(); }
  },

  setTemplate: function(){
    if (this.model.isSavings()) { this.template = 'accounts/savings_form'; }
    if (this.model.isShare()) { this.template = 'accounts/shares_form'; }
  },

  _setSavingsAttributes: function(){
    this.model.set({
      name: this.$('#name').val(),
      bank: this.$('#bank').val(),
      starting_balance: dollarsToCents(this.$('#starting_balance').val()),
      starting_date: this.$('#starting_date').val()
    });
  },

  _setSharesAttributes: function(){
    this.model.set({
      ticker: this.$('#ticker').val(),
      name: this.$('#name').val()
    });
  }

});
