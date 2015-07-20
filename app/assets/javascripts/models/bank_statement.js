MyMoney.Models.BankStatement = MyMoney.Models.BaseModel.extend({

  urlRoot: function() {
    return 'accounts/' + this.get('account_id') + '/bank_statements';
  },

  parse : function(response, xhr) {
    return response.bank_statement || response;
  }
});
