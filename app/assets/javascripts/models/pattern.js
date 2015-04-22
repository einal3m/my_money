MyMoney.Models.Pattern = Backbone.Model.extend({

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
  },

  saveState: function(){
    this.savedState = this.toJSON();
  },

  restoreSavedState: function(){
    this.set(this.savedState);
  },

  isDestroyed: function(){
    return this._isDestroyed;
  },

  setDestroyed: function(){
    this._isDestroyed = true;
  },

  isNew: function(){
    return !(_.isNumber(this.id));
  }
});