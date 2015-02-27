MyMoney.Views.TransactionEditView = Backbone.View.extend({

  template: "transactions/transaction_edit",
  tagName: "tr",

  events: {
    "click #save": "saveTransaction"
  },

  initialize: function() {
    this.account = this.options['account'];
    this.categories = this.options['categories'];
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({transaction: this.model.toJSON(), categories: this.categories}));
    Backbone.Validation.bind(this);
    return this;
  },

  saveTransaction: function(e){
    e.preventDefault();
    e.stopPropagation();

    var amount = dollarsToCents(this.$('#amount').val());
    var date = this.$('#date').val();
    this.model.set({date: date});
    this.model.set({amount: amount});

    if(this.model.isValid(true)){
      this.model.save({ }, { wait: true });
    }
  }
});