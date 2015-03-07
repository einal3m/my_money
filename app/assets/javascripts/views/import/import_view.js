MyMoney.Views.ImportView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",
  template: "import/import",

  // events: {
  //   'click [type="checkbox"]': 'toggleTransaction',
  //   'click #done' : 'finishReconcile'
  // },

  initialize: function(options){
    this.account = this.options['account'];
    this.accounts = this.options['accounts'];
    this.addSubView('import', new MyMoney.Views.ImportFileChooserView({account: this.account, 
                                                               accounts: this.accounts}));
    // this.listenTo(this.subViews['panel1'], "startReconcile", this.startReconcile);
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]());
    this.renderSubViews();
    return this;
  }
});