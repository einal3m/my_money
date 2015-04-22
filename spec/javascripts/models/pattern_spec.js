describe('Pattern', function(){
  var pattern;
  beforeEach(function(){
    pattern = new MyMoney.Models.Pattern({id: 10, account_id: 14});
  });

  it('has a name', function(){
    expect(pattern.name).toEqual('pattern');
  })

  it('has a URL', function(){
    expect(pattern.url()).toEqual('accounts/14/patterns/10');
  });

  describe('validation', function(){
    it ('requires a match text', function(){
      expect(pattern.preValidate('match_text', '   ')).toEqual('Match text is required');
      expect(pattern.preValidate('match_text', 'anything')).toEqual('');
    });

    it ('requires a category', function(){
      expect(pattern.preValidate('category_id', '   ')).toEqual('Category is required');
      expect(pattern.preValidate('category_id', 60)).toEqual('');
    });

    it ('requires an account', function(){
      expect(pattern.preValidate('account_id', null)).toEqual('Account is required');
      expect(pattern.preValidate('account_id', 2)).toEqual('');
    });
  });

  describe('saved state', function(){
    it('saves the current state of the model', function(){
      pattern.saveState();
      expect(pattern.savedState).toEqual(pattern.toJSON());
    });

    it('restores the saved state to the model', function(){
      pattern.saveState();
      expect(pattern.get('account_id')).toEqual(14);
      pattern.set({account_id: 11});
      expect(pattern.get('account_id')).toEqual(11);
      pattern.restoreSavedState();
      expect(pattern.get('account_id')).toEqual(14);
    });
  });

  describe('isNew', function(){
    it('is true if model is new', function(){
      var new_pattern = new MyMoney.Models.Pattern();
      expect(new_pattern.isNew()).toBeTruthy();
    });

    it('is false if model exists', function(){
      expect(pattern.isNew()).toBeFalsy();
    });
  });

  it('sets the destroy flag', function(){
    expect(pattern.isDestroyed()).toBeFalsy();
    pattern.setDestroyed();
    expect(pattern.isDestroyed()).toBeTruthy();
  });
});