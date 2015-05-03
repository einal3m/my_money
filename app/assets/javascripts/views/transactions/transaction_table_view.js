MyMoney.Views.TransactionTableView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "transaction_table",

  template: "transactions/transaction_table",

  events: {
    "click #cancel": "removeSubView",
    "click .fa-edit": "editTransaction",
  },

  initialize: function() {
    this.accounts = this.options['accounts'];
    this.categories = this.options['categories'];
    this.subcategories = this.options['subcategories'];
    this.categoryTypes = this.options['categoryTypes'];
  },

  addAll: function(){
    for (var i = 0; i < this.collection.length; i++) { 
      this.addOne(this.collection.models[i]);
    }
  },

  addOne: function(model){
    var rowView = new MyMoney.Views.TransactionRowView({
      model: model,
      categoryTypes: this.categoryTypes,
      categories: this.categories,
      subcategories: this.subcategories
    });
    this.$el.find('tbody').append(rowView.render().el);
  },

  render: function () {
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addAll();
    this.renderSubViews();
    return this;
  },

  removeSubView: function() {
    if (this.subView.rendered) {
      this.subView.remove();
      this.subView.rendered = false;
    }
    if (this.edit_row) {
      this.edit_row.removeClass('success');
    }
  },

  editTransaction: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.subView && this.subView.rendered) {
      return;
    }

    var txn_id = e.currentTarget.getAttribute('id')
    var txn = this.collection.get(txn_id);
    this.edit_row = this.$el.find('#'+txn_id).closest('tr');
    this.subView = new MyMoney.Views.TransactionEditView({
      model: txn, 
      categories: this.categories,
      subcategories: this.subcategories,
      categoryTypes: this.categoryTypes
    });
    this.edit_row.after(this.subView.render().el);
    this.edit_row.addClass('success');
    this.subView.rendered = true;
    this.listenTo(txn, 'sync', this.transactionSaved);
  },

  transactionSaved: function(){
    this.trigger('transactionsUpdated');
  }

});