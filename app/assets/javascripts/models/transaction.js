MyMoney.Models.Transaction = Backbone.Model.extend({

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