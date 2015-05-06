MyMoney.Models.AccountType = MyMoney.Models.BaseModel.extend({

  urlRoot: 'account_types',

  parse : function(response, xhr) {
    return response.account_type || response;
  }

});
