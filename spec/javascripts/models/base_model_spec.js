describe('BaseModel', function(){
  var model;
  beforeEach(function(){
    model = new MyMoney.Models.BaseModel({ id: 10, foo: 'bar' });
  });

  describe('saved state', function(){
    it('saves the current state of the model', function(){
      model.saveState();
      expect(model.savedState).toEqual(model.toJSON());
    });

    it('restores the saved state to the model', function(){
      model.saveState();
      expect(model.get('foo')).toEqual('bar');
      model.set({foo: 'blah'});
      expect(model.get('foo')).toEqual('blah');
      model.restoreSavedState();
      expect(model.get('foo')).toEqual('bar');
    });
  });

  describe('isNew', function(){
    it('is true if model is new', function(){
      var new_model = new MyMoney.Models.BaseModel();
      expect(new_model.isNew()).toBeTruthy();
    });

    it('is false if model exists', function(){
      expect(model.isNew()).toBeFalsy();
    });
  });

  it('destroy flag', function(){
    expect(model.isDestroyed()).toBeFalsy();
    model.setDestroyed();
    expect(model.isDestroyed()).toBeTruthy();
  });
});