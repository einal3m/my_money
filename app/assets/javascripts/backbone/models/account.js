MyMoney.Models.Account = Backbone.Model.extend({

  urlRoot: 'accounts'

});

MyMoney.Collections.AccountsCollection = Backbone.Collection.extend({

  model: MyMoney.Models.Account,

  url: '/accounts',

  parse : function(resp, xhr) {
  	return resp.accounts;
  },

});
