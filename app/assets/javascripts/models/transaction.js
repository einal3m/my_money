MyMoney.Models.Transaction = MyMoney.Models.BaseModel.extend({

  name: "transaction",

  urlRoot: function() {
    return 'accounts/' + this.get('account_id') + '/transactions';
  },

  parse : function(response, xhr) {
    return response.transaction || response;
  },

  validation: {
    date: {
      required: true
    },
    amount: {
      required: true
    },
    account_id: {
      required: true,
      msg: 'Account is required'
    }
  }

});