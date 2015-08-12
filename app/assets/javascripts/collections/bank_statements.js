MyMoney.Collections.BankStatements = Backbone.Collection.extend({

  model: MyMoney.Models.BankStatement,

  initialize: function(models, options) {
    this.account_id = _.result(options, 'account_id');
  },

  url: function() {
    return '/accounts/' + this.account_id + '/bank_statements';
  },

  parse: function(resp, xhr) {
    return resp.bank_statements;
  }
});
