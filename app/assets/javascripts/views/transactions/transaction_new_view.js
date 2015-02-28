
MyMoney.Views.TransactionNewView = Backbone.View.extend({

  template: "transactions/transaction_new",
  tagName: "tr",

  events: {
    "click #cancel": "cancelTransaction",
    "click #save": "saveTransaction"
  },

  initialize: function() {
    this.account = this.options['account'];
    this.categories = this.options['categories'];
    this.categoryTypes = this.options['categoryTypes'];
    this.model = new MyMoney.Models.Transaction;
    this.model.set('account_id', this.account.get('id'));
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({transaction: this.model.toJSON(), categories: this.categories, categoryTypes: this.categoryTypes}));
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
    this.model.set({category_id: this.$('#category_id').val()});

    if(this.model.isValid(true)){
      this.collection.create(this.model, { wait: true });
    }
  },

  cancelTransaction: function(e) {
    e.preventDefault();
  }
});