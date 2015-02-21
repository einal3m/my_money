
MyMoney.Views.TransactionRowView = Backbone.View.extend({

  template: "transactions/transaction_row",
  tagName: "tr",

  events: {
    "click #show": "showAccount"
  },

  initialize: function() {
    this.categories = this.options['categories'];
    this.category = this.categories.get(this.model.get('category_id'));
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({transaction: this.model.toJSON(), category: this.category}));
    return this;
  },

  showAccount: function(e){
    e.preventDefault();
    e.stopPropagation();
//    window.router.navigate('accounts/' + this.model.id + '/show', {trigger: true});
  }
});