describe("CategoryIndexView", function(){
  var view, categories, subcategories, categoryTypes;
  beforeEach(function(){
    categoryTypes = new MyMoney.Collections.CategoryTypes([
      {id: 1, name: 'Income'},
      {id: 2, name: 'Expense'}
    ]);
    categories = new MyMoney.Collections.Categories([
      {id: 3, name: 'Category One', category_type_id: 1},
      {id: 4, name: 'Category Two', category_type_id: 1},
      {id: 5, name: 'Category Three', category_type_id: 2},
      {id: 6, name: 'Category Four', category_type_id: 2}
    ]);
    subcategories = new MyMoney.Collections.Subcategories([
      {id: 5, name: 'Subcategory1', category_id: 3},
      {id: 6, name: 'Subcategory2', category_id: 6}
    ]);

    view = new MyMoney.Views.CategoryIndexView({
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
    expect(view.categoryTypes).toEqual(categoryTypes);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays the category index page", function(){
      expect(view.$('h1')).toContainText('my categories');
    });

    it("displays Income and Expense tables", function(){
      expect(view.$('.panel-heading')[0]).toContainText('Income');
      expect(view.$('.panel-heading')[1]).toContainText('Expense');
    });
  });

  it('creates two CategoryTypeTableViews with a subset of categories and subcategories', function(){
    spyOn(MyMoney.Views.CategoryTypeTableView.prototype, 'initialize').and.callThrough();
    view.render();

    var argsForIncome = MyMoney.Views.CategoryTypeTableView.prototype.initialize.calls.argsFor(0)[0];
    var argsForExpense = MyMoney.Views.CategoryTypeTableView.prototype.initialize.calls.argsFor(1)[0];

    expect(argsForIncome.model).toEqual(categoryTypes.at(0))
    expect(argsForIncome.categories.at(0)).toEqual(categories.at(0));
    expect(argsForIncome.categories.at(1)).toEqual(categories.at(1));
    expect(argsForIncome.subcategories).toEqual(subcategories);
    expect(argsForIncome.categoryTypes).toEqual(categoryTypes);

    expect(argsForExpense.model).toEqual(categoryTypes.at(1))
    expect(argsForExpense.categories.at(0)).toEqual(categories.at(3));
    expect(argsForExpense.categories.at(1)).toEqual(categories.at(2));
    expect(argsForExpense.subcategories).toEqual(subcategories);
    expect(argsForExpense.categoryTypes).toEqual(categoryTypes);
  });

  xdescribe('after edit', function(){
    beforeEach(function(){
      spyOn(view, 'render');
    });
    it('re-renders the view if category is added', function(){
      view.categories.trigger('add');
      expect(view.render).toHaveBeenCalled();
    });

    it('re-renders the view if category is changed', function(){
      view.categories.trigger('change');
      expect(view.render).toHaveBeenCalled();
    });

    it('re-renders the view if category is removed', function(){
      view.categories.trigger('destroy');
      expect(view.render).toHaveBeenCalled();
    });

    it('re-renders the view if subcategory is added', function(){
      view.subcategories.trigger('add');
      expect(view.render).toHaveBeenCalled();
    });

    it('re-renders the view if subcategory is changed', function(){
      view.subcategories.trigger('change');
      expect(view.render).toHaveBeenCalled();
    });

    it('re-renders the view if subcategory is removed', function(){
      view.subcategories.trigger('destroy');
      expect(view.render).toHaveBeenCalled();
    });
  });
});
