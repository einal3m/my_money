
MyMoney.Views.AccountEditView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",
  template: "accounts/account_edit",

  events: {
    "click #save" : "updateAccount",
    "click #delete" : "deleteAccount",
    "click #cancel" : "cancelEdit"
  },

  render: function() {
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    return this;
  },

  deleteAccount: function(e){
    e.preventDefault();
    e.stopPropagation();

    var r = confirm("Are you sure you want to delete this account?");
    if (r == true) {
      this.model.destroy({ wait: true });
      window.router.navigate('accounts', {trigger: true});    
    }
  },

  updateAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.set({name: this.$('#name').val()});
    this.model.set({bank: this.$('#bank').val()});
    balance = accounting.unformat(this.$('#starting_balance').val());
    this.model.set({starting_balance: balance});
    this.model.set({starting_date: this.$('#starting_date').val()});
    this.model.save({ }, { wait: true });
    this.trigger("doneEditing");
  },

  cancelEdit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.trigger("doneEditing");
  }

});