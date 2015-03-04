
MyMoney.Views.AccountEditView = Backbone.View.extend({

  tagName: "div", 
  className: "accounts",
  template: "accounts/account_edit",
  // mixins: [MyMoney.Mixins.DeleteModel],

  events: {
    "click #save" : "updateAccount",
    "click #cancel" : "cancelEdit",
    "click #delete" : "deleteModel"
  },

  render: function() {
    this.$el.html(HandlebarsTemplates[this.template]({account: this.model.toJSON()}));
    return this;
  },

  updateAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.set({name: this.$('#name').val()});
    this.model.set({bank: this.$('#bank').val()});
    balance = dollarsToCents(this.$('#starting_balance').val());
    this.model.set({starting_balance: balance});
    this.model.set({starting_date: this.$('#starting_date').val()});
    this.model.save({ }, { wait: true });
    this.trigger("doneEditing");
  },

  cancelEdit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.trigger("doneEditing");
  },

  deleteModel: function(e){
    e.preventDefault();
    e.stopPropagation();

    var r = confirm('Are you sure you want to delete this ' + this.model.name + '?');
    if (r == true) {
      this.model.destroy({ wait: true });
    }
  }

});
