describe("CategoryTableView", function(){
  var view, categories, subcategories, categoryType, categoryTypes;
  beforeEach(function(){
    categoryType = new MyMoney.Models.CategoryType({id: 1, name: 'Category Type'});
    categoryTypes = new MyMoney.Collections.CategoryTypesCollection([categoryType]);

    filteredCategories = new MyMoney.Collections.Categories([
      {id: 3, name: 'Category1', category_type_id: 1},
      {id: 4, name: 'Category2', category_type_id: 1}
    ]);
    categories = new MyMoney.Collections.Categories([]);
    subcategories = new MyMoney.Collections.Subcategories([
      {id: 5, name: 'Subcategory1', category_id: 3},
      {id: 6, name: 'Subcategory2', category_id: 4}
    ]);

    view = new MyMoney.Views.CategoryTypeTableView({
      model: categoryType,
      categoryTypes: categoryTypes,
      filteredCategories: filteredCategories,
      categories: categories,
      subcategories: subcategories
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(categoryType);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.filteredCategories).toEqual(filteredCategories);
    expect(view.subcategories).toEqual(subcategories);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a panel with table", function(){
      expect(view.el).toContainElement('.panel');
      expect(view.$('.panel-heading')).toContainText('Category Type');
      expect(view.$('.panel')).toContainElement('table');
    });

    it('has a new button', function(){
      expect(view.el).toContainElement('button#new');
    });

    it ('has rows', function(){
      expect(view.$('tr').length).toEqual(6)
    });
  });

  describe('new model', function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a new edit view", function(){
      expect(view.editView).not.toBeDefined();
      view.$('#new').click();
      expect(view.editView).toBeDefined();
      expect(view.editView.model.isNew()).toBeTruthy();
      expect(view.editView.model.get('category_type_id')).toEqual(1);
      expect(view.editView.collection).toEqual(categories);
      expect(view.editView.categoryTypes).toEqual(categoryTypes);
    });

    it("disables the new button", function(){
      view.$('#new').click();
      expect(view.$('#new').attr('disabled')).toEqual('disabled');
    });
  });
});