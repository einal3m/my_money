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
  },

  defaults: {
    "amount": 0
  },

  isBankTransaction: function(){
    return (this.get('transaction_type') === 'bank_transaction');
  },
  isSharePurchase: function(){
    return (this.get('transaction_type') === 'share_purchase');
  },
  isDividend: function(){
    return (this.get('transaction_type') === 'dividend');
  },
  isUnitPriceUpdate: function(){
    return (this.get('transaction_type') === 'unit_price_update');
  },
  isShareSale: function(){
    return (this.get('transaction_type') === 'share_sale');
  }

});