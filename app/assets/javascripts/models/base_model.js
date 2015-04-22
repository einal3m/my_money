MyMoney.Models.BaseModel = Backbone.Model.extend({

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