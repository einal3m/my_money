MyMoney.Views.ImportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",
  template: "import/import",

  initialize: function(options){
    this.account = this.options.account;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
    this.model = new MyMoney.Models.BankStatement({account_id: this.account.id});
    this.collection = new MyMoney.Collections.Transactions([], {account_id: this.account.id});
    this.listenTo(this.collection, 'reset', this.transactionsLoaded);
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    this.addSubView('import', new MyMoney.Views.ImportFileChooserView({
      account: this.account,
      model: this.model,
      collection: this.collection
    }));
    this.renderSubViews();
    return this;
  },

  transactionsLoaded: function(){
    this.addSubView('import', new MyMoney.Views.ImportTransactionSelectView({
      model: this.model,
      collection: this.collection,
      account: this.account,
      categories: this.categories,
      subcategories: this.subcategories,
      categoryTypes: this.categoryTypes
    }));
    this.renderSubViews();
  }
});
