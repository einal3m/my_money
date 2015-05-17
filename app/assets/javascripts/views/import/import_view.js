MyMoney.Views.ImportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",
  template: "import/import",

  events: {
  //   'click [type="checkbox"]': 'toggleTransaction',
    'click #upload' : 'uploadTransactions',
    'click #cancel' : 'goBack',
    'click [type="checkbox"]': 'toggleTransaction'
  },

  initialize: function(options){
    this.account = this.options.account;
    this.accounts = this.options.accounts;
    this.categories = this.options.categories;
    this.subcategories = this.options.subcategories;
    this.categoryTypes = this.options.categoryTypes;
    this.addSubView('import', new MyMoney.Views.ImportFileChooserView({account: this.account, 
                                                               accounts: this.accounts}));
    this.listenTo(this.subViews['import'], "uploadOFX", this.uploadOFX);
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    this.renderSubViews();
    return this;
  },

  goBack: function() {
    window.history.back();
  },

  uploadOFX: function() {
    var data = new FormData();
    var view = this;
    data.append('data_file', this.$('input[id="file_name"]')[0].files[0]);
    $.ajax({
      url: '/accounts/' + this.account.id + '/transactions/ofx',
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      success: function(data){
        view.transactions = new MyMoney.Collections.Transactions(
          data.transactions,
          { account_id: view.account.id }
        );
        view.addSubView('import', new MyMoney.Views.ImportTransactionSelectView({
          collection: view.transactions,
          categories: view.categories,
          subcategories: view.subcategories,
          categoryTypes: view.categoryTypes
        }));
        view.renderSubViews();
      }
    });
  },

  toggleTransaction: function(e) {
    e.stopPropagation();
    var checked = e.currentTarget.checked;
    var cid = e.currentTarget.id;
    var model = this.transactions.get(cid);
    model.set('import', checked);
  },

  uploadTransactions: function(e) {
    var view = this;
    var txns_to_upload = new MyMoney.Collections.Transactions(
      this.transactions.where({ 'import': true }),
      { account_id: this.account.id }
    );

    $.when(txns_to_upload.save({ wait: true })).done(function () {
      view.goToTransactions();
    });
  },

  goToTransactions: function() {
    window.router.navigate('accounts/' + this.account.id + '/transactions', {trigger: true});
  }

});
