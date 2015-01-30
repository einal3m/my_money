
MyMoney.Views.AccountEditView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",
  template: "accounts/account_edit",

  events: {
    "click #save" : "updateAccount",
    "click #delete" : "deleteAccount"
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
      window.router.navigate('index', {trigger: true});    
    }
  },

  updateAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.set({name: this.$('#name').val()});
    this.model.set({bank: this.$('#bank').val()});
    this.model.set({starting_balance: this.$('#starting_balance').val()});
    this.model.set({starting_date: this.$('#starting_date').val()});
    this.model.save({ }, { wait: true });
    window.router.navigate('index', {trigger: true});    
  },

});