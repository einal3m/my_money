
MyMoney.Collections.AccountsCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Account,

  url: '/accounts',

  parse : function(resp, xhr) {
    return resp.accounts;
  },

  findByAccountType: function(accountType){
    return new MyMoney.Collections.AccountsCollection(this.where({account_type_id: accountType.id}));
  }
});
