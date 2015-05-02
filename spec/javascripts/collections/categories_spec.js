describe('Categories', function(){

  it('url', function(){
    var categories = new MyMoney.Collections.Categories([]);
    expect(categories.url).toEqual('/categories');
  });

  it('sort comparator', function(){
    var categories = new MyMoney.Collections.Categories([
      {id: 3, name: 'Hello', category_type_id: 1},
      {id: 4, name: 'And', category_type_id: 1},
      {id: 6, name: 'GoodBye', category_type_id: 1}
    ]);

    // var sortedCategories = categories.sortByNameForCategoryType(categoryType);
    expect(categories.at(0).get('name')).toEqual('And');
    expect(categories.at(1).get('name')).toEqual('GoodBye');
    expect(categories.at(2).get('name')).toEqual('Hello');
  });

  it('findByCategoryType', function(){
    var categoryType = new MyMoney.Models.CategoryType({id: 1, name: 'Income'});
    var categories = new MyMoney.Collections.Categories([
      {id: 3, name: 'Hello', category_type_id: 1},
      {id: 5, name: 'Not', category_type_id: 2},
      {id: 6, name: 'GoodBye', category_type_id: 1}
    ]);

    filteredCategories = categories.findByCategoryType(categoryType);
    expect(filteredCategories.length).toEqual(2);
    expect(filteredCategories.at(0).get('name')).toEqual('GoodBye');    
    expect(filteredCategories.at(1).get('name')).toEqual('Hello');    
  });
});
