describe('Subcategories', function(){

  it('url', function(){
    var subcategories = new MyMoney.Collections.Subcategories([]);
    expect(subcategories.url).toEqual('/subcategories');
  });

  it('sortByName', function(){
    var category = new MyMoney.Models.Category({id: 1, name: 'Category'});
    var subcategories = new MyMoney.Collections.Subcategories([
      {id: 3, name: 'Hello', category_id: 1},
      {id: 4, name: 'And', category_id: 1},
      {id: 5, name: 'Not', category_id: 2},
      {id: 6, name: 'GoodBye', category_id: 1}
    ]);

    var sortedSubcategories = subcategories.sortByNameForCategory(category);
    expect(sortedSubcategories.length).toEqual(3);
    expect(sortedSubcategories.at(0)).toEqual(subcategories.at(1));
    expect(sortedSubcategories.at(1)).toEqual(subcategories.at(3));
    expect(sortedSubcategories.at(2)).toEqual(subcategories.at(0));
  })
});
