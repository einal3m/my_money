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
});