MyMoney.Collections.AccountTypes = Backbone.Collection.extend({

  model: MyMoney.Models.AccountType,
  url: '/account_types',

  parse : function(resp, xhr) {
    return resp.account_types;
  }
});
