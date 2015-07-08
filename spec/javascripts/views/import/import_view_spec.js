describe("MyMoney.Views.ImportView", function(){
  var view, account, categories, subcategories, categoryTypes;
  beforeEach(function(){
    categoryTypes = new MyMoney.Collections.CategoryTypes([]);
    categories = new MyMoney.Collections.Categories([]);
    subcategories = new MyMoney.Collections.Subcategories([]);
    account = new MyMoney.Models.Account({id: 22, name: 'My Account'});

    view = new MyMoney.Views.ImportView({
      account: account,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.account).toEqual(account);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
    expect(view.collection).toEqual(jasmine.any(MyMoney.Collections.Transactions));
    expect(view.collection.length).toEqual(0);
    expect(view.collection.account_id).toEqual(account.id);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays step 1 of the import view", function(){
      expect(view.$('h1')).toContainText('import transactions');
    });

    it("renders the step 1 sub view", function(){
      expect(view.$('#import')).toContainText('Step 1 of 2');
      expect(view.subViews['import']).toEqual(jasmine.any(MyMoney.Views.ImportFileChooserView));      
      expect(view.subViews['import'].collection).toEqual(view.collection);
    });

    it('renders the step 2 sub view when collection loaded', function(){
      view.collection.reset([{id: 11, date: '2014-12-01', amount: 500}]);
      expect(view.$('#import')).toContainText('Step 2 of 2');
      expect(view.subViews['import']).toEqual(jasmine.any(MyMoney.Views.ImportTransactionSelectView));      
      expect(view.subViews['import'].collection).toEqual(view.collection);
    });
  });
});
