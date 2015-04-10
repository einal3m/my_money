describe('CategoryType', function(){
  var categoryType;
  beforeEach(function(){
    categoryType = new MyMoney.Models.CategoryType({id: 10});
  });

  it('has a URL', function(){
    expect(categoryType.url()).toEqual('category_types/10');
  });
});