describe('Categories', function(){

  it('url', function(){
    var categories = new MyMoney.Collections.Categories([]);
    expect(categories.url).toEqual('/categories');
  });

  it('sortByName', function(){
    var categoryType = new MyMoney.Models.CategoryType({id: 1, name: 'Income'});
    var categories = new MyMoney.Collections.Categories([
      {id: 3, name: 'Hello', category_type_id: 1},
      {id: 4, name: 'And', category_type_id: 1},
      {id: 5, name: 'Not', category_type_id: 2},
      {id: 6, name: 'GoodBye', category_type_id: 1}
    ]);

    var sortedCategories = categories.sortByNameForCategoryType(categoryType);
    expect(sortedCategories.length).toEqual(3);
    expect(sortedCategories.at(0)).toEqual(categories.at(1));
    expect(sortedCategories.at(1)).toEqual(categories.at(3));
    expect(sortedCategories.at(2)).toEqual(categories.at(0));
  })
});
