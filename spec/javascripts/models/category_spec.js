describe('Category', function(){
  var category;
  beforeEach(function(){
    category = new MyMoney.Models.Category({id: 10});
  });

  it('has a name', function(){
    expect(category.name).toEqual('category');
  })

  it('has a URL', function(){
    expect(category.url()).toEqual('categories/10');
  });

  describe('validation', function(){
    it ('requires a name', function(){
      expect(category.preValidate('name', '   ')).toEqual('Name is required');
      expect(category.preValidate('name', 'Category Name')).toEqual('');
    });

    it ('requires a category_type_id', function(){
      expect(category.preValidate('category_type_id', null)).toEqual('Category type is required');
      expect(category.preValidate('category_type_id', 2)).toEqual('');
    });
  });
});