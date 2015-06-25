//= require ./base_model

MyMoney.Models.Account = MyMoney.Models.BaseModel.extend({

  name: "account",
  urlRoot: 'accounts',

  parse : function(response, xhr) {
    return response.account || response;
  },

  isSavings: function(){
    return (this.get('account_type') === 'savings');
  },

  isShare: function(){
    return (this.get('account_type') === 'share');
  },

  validation: {
    account_type: {
      required: true,
      msg: 'Account type is required'
    },
    name: {
      required: true
    },
    starting_balance: function (value) {
      if (this.isSavings() && _.isNull(value)) {
        return 'Opening balance is required';
      } else if (this.isSavings() && !_.isNumber(value)) {
        return 'Opening balance must be a number';
      } else { return ''; }
    },
    starting_date: function (value) {
      if (this.isSavings() && !value) {
        return 'Opening balance date is required';
      } else { return ''; }
    },
    ticker: function (value) {
      if (this.isShare() && !value) {
        return 'Ticker is required';
      } else { return ''; }
    }
  }

});
