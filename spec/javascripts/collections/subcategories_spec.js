describe('Subcategories', function(){

  it('url', function(){
    var subcategories = new MyMoney.Collections.Subcategories([]);
    expect(subcategories.url).toEqual('/subcategories');
  });

  it('sort comparator', function(){
    var subcategories = new MyMoney.Collections.Subcategories([
      {id: 3, name: 'Hello', category_id: 1},
      {id: 4, name: 'and', category_id: 1},
      {id: 5, name: 'Not', category_id: 2},
      {id: 6, name: 'GoodBye', category_id: 1}
    ]);

    expect(subcategories.at(0).get('name')).toEqual('and');
    expect(subcategories.at(1).get('name')).toEqual('GoodBye');
    expect(subcategories.at(2).get('name')).toEqual('Hello');
    expect(subcategories.at(3).get('name')).toEqual('Not');
  });

  it('findByCategory', function(){
    var category = new MyMoney.Models.Category({id: 1, name: 'Category'});
    var subcategories = new MyMoney.Collections.Subcategories([
      {id: 3, name: 'Hello', category_id: 1},
      {id: 4, name: 'and', category_id: 1},
      {id: 5, name: 'Not', category_id: 2},
      {id: 6, name: 'GoodBye', category_id: 1}
    ]);

    var filteredSubcategories = subcategories.findByCategory(category);
    expect(filteredSubcategories.length).toEqual(3);
    expect(filteredSubcategories.at(0).get('name')).toEqual('and');
    expect(filteredSubcategories.at(1).get('name')).toEqual('GoodBye');
    expect(filteredSubcategories.at(2).get('name')).toEqual('Hello');
  });
});
