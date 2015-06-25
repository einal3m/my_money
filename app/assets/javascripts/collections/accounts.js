
MyMoney.Collections.Accounts = Backbone.Collection.extend({

  model: MyMoney.Models.Account,

  url: '/accounts',

  parse : function(resp, xhr) {
    return resp.accounts;
  },

  findByAccountType: function(accountType){
    return new MyMoney.Collections.Accounts(this.where({account_type: accountType.get('code')}));
  }
});
