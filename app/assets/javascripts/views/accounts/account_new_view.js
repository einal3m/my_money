MyMoney.Views.AccountNewView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

  template: "accounts/account_new",

  events: {
    "click #save": "saveAccount",
    "click #cancel" : "cancelNew"   
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    return this;
  },

  saveAccount: function(e){
    e.preventDefault();
    e.stopPropagation();

    this.model = new MyMoney.Models.Account({});
    this.model.set({name: this.$('#name').val()});
    this.model.set({bank: this.$('#bank').val()});
    this.model.set({starting_balance: this.$('#starting_balance').val()});
    this.model.set({starting_date: this.$('#starting_date').val()});
    this.collection.create(this.model, { wait: true, success: this.goToShow });
  },

  cancelNew: function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('accounts/index', {trigger: true});    
  },

  goToShow: function(model, response, options) {
    window.router.navigate('accounts/' + model.id + '/show', {trigger: true});
  }
});