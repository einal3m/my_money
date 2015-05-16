MyMoney.Views.AccountSummaryView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",
	template: "accounts/account_summary",

  events: {
    "click #reconcile": "reconcileAccount"
  },

  initialize: function(){
    this.accountType = this.options.accountType;
  },

  render: function() {
    this.$el.html(HandlebarsTemplates[this.template](this.model.toJSON()));
    this.loadShowView();
    return this;
  },

  loadEditView: function() {
    this.addSubView('account', new MyMoney.Views.AccountFormView({
      model: this.model,
      accountType: this.accountType
    }));
    this.listenTo(this.model, 'sync', this.loadShowView);
    this.listenTo(this.subViews.account, 'cancel', this.loadShowView);
    this.renderSubViews();
  },

  loadShowView: function() {
    this.addSubView('account', new MyMoney.Views.AccountShowView({
      model: this.model,
      accountType: this.accountType
    }));
    this.listenTo(this.subViews.account, 'edit', this.loadEditView);
    this.renderSubViews();
  },

  reconcileAccount: function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.router.navigate('accounts/' + this.model.id + '/reconciliation', {trigger: true});    
  }
  
});
