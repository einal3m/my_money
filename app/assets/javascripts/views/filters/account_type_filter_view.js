MyMoney.Views.AccountTypeFilterView = MyMoney.Views.BaseView .extend({

  template: "filters/account_type_filter",

  events: {
    "change #account_type_id" : "accountTypeChanged"   
  },

  initialize: function(){
    this.accountType = this.options.accountType;
    this.accountTypes = this.options.accountTypes;
  },

  templateData: function(){
    return {
      accountTypeId: (this.accountType) ? this.accountType.id : null,
      accountTypes: this.accountTypes
    };
  },

  accountTypeChanged: function(e){
    e.preventDefault();
    e.stopPropagation();
    var accountType = this.accountTypes.get(parseInt(this.$('#account_type_id').val(), 10));
    this.model.set('account_type', accountType.get('code'));
  }
});
