MyMoney.Models.Pattern = MyMoney.Models.BaseModel.extend({

  name: "pattern",
  _isDestroyed: false,

  urlRoot: function() {
    return 'accounts/' + this.get('account_id') + '/patterns';
  },

  parse : function(response, xhr) {
    return response.pattern || response;
  },

  validation: {
    match_text: {
      required: true
    },
    category_id: {
      required: true,
      msg: 'Category is required'
    },
    account_id: {
      required: true,
      msg: 'Account is required'
    }
  }

});