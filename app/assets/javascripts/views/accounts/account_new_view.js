//= require ../base_table_view
MyMoney.Views.AccountNewView = MyMoney.Views.BaseView.extend({

  tagName: "div", 
  className: "accounts",

  template: "accounts/account_new",

  initialize: function(){
    this.accountTypes = this.options.accountTypes;
    this.model = new MyMoney.Models.Account();
    this.filterModel = new MyMoney.Models.Filter();
    this.listenTo(this.filterModel, 'change', this.filterChanged);
    this.listenTo(this.collection, 'add', this.goBack);
  },

  render: function(){
    this.$el.html(HandlebarsTemplates[this.template]({ account: this.model.toJSON() }));
    this.addSubView('filter', new MyMoney.Views.FilterView({
      model: this.filterModel,
      accountTypes: this.accountTypes
    }));
    this.renderSubViews();
    return this;
  },

  filterChanged: function(){
    this.addFormView();
  },

  addFormView: function(){
    var account_type_id = this.filterModel.get('account_type_id');
    this.model.set({account_type_id: account_type_id});
    this.addSubView('new_form', new MyMoney.Views.AccountFormView({
      model: this.model,
      collection: this.collection,
      accountType: this.accountTypes.get(account_type_id)
    }));
    this.listenTo(this.subViews.new_form, 'cancelEdit', this.goBack);
    this.renderSubView('new_form');
  },

  goBack: function(){
    window.router.navigate('accounts', {trigger: true});
  }

});
