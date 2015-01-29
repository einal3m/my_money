MyMoney.Views.AccountNewView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",

  template: JST["backbone/templates/accounts/account_new"],

  events: {
   "click #save": "saveAccount"
  },

  render: function(){
   this.$el.html(this.template());
   return this;
  },

  saveAccount: function(e){
    e.preventDefault();
    e.stopPropagation();
    var model = new MyMoney.Models.Account({});
    model.set({name: this.$('#name').val()});
    model.set({bank: this.$('#bank').val()});
    model.set({starting_balance: this.$('#starting_balance').val()});
    model.set({starting_date: this.$('#starting_date').val()});
    this.collection.create(model, { wait: true });
    window.router.navigate('index', {trigger: true});    
  },

});