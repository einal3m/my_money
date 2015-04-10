describe('Subcategory', function(){
  var subcategory;
  beforeEach(function(){
    subcategory = new MyMoney.Models.Subcategory({id: 10});
  });

  it('has a name', function(){
    expect(subcategory.name).toEqual('subcategory');
  })

  it('has a URL', function(){
    expect(subcategory.url()).toEqual('subcategories/10');
  });

  describe('validation', function(){
    it ('requires a name', function(){
      expect(subcategory.preValidate('name', '   ')).toEqual('Name is required');
      expect(subcategory.preValidate('name', 'Subcategory Name')).toEqual('');
    });

    it ('requires a category_id', function(){
      expect(subcategory.preValidate('category_id', null)).toEqual('Category is required');
      expect(subcategory.preValidate('category_id', 2)).toEqual('');
    });
  });
});