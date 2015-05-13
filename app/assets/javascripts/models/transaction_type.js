MyMoney.Models.TransactionType = MyMoney.Models.BaseModel.extend({

  urlRoot: 'transaction_types',

  parse : function(response, xhr) {
    return response.transaction_type || response;
  }

});
