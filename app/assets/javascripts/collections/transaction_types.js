MyMoney.Collections.TransactionTypes = Backbone.Collection.extend({

  model: MyMoney.Models.TransactionType,
  url: '/transaction_types',

  parse : function(resp, xhr) {
    return resp.transaction_types;
  }
});
