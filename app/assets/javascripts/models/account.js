//= require ./base_model

MyMoney.Models.Account = MyMoney.Models.BaseModel.extend({

  name: "account",
  urlRoot: 'accounts',

  parse : function(response, xhr) {
    return response.account || response;
  },

  validation: {
    name: {
      required: true
    },
    starting_balance: {
      required: true,
      msg: 'Opening balance is required'
    },
    starting_date: {
      required: true,
      msg: 'Opening balance date is required'
    }
  }

});
