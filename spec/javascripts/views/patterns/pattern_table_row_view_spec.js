describe("PatternTableRowView", function(){
  var view, account, categories, subcategories, categoryTypes, pattern;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      name: 'My Account'
    });

    pattern = new MyMoney.Models.Pattern({
      id: 12,
      match_text: 'My match text',
      notes: 'My Notes',
      category_id: 4,
      subcategory_id: 6
    });

    categoryTypes = new MyMoney.Collections.CategoryTypesCollection([
      {id: 1, name: 'Income'},
      {id: 2, name: 'Expense'}
    ]);
    categories = new MyMoney.Collections.CategoriesCollection([
      {id: 3, name: 'Category1', category_type_id: 1},
      {id: 4, name: 'Category2', category_type_id: 2}
    ]);
    subcategories = new MyMoney.Collections.SubcategoriesCollection([
      {id: 5, name: 'Subcategory1', category_id: 3},
      {id: 6, name: 'Subcategory2', category_id: 4}
    ]);

    view = new MyMoney.Views.PatternTableRowView({
      model: pattern,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(pattern);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a table row with pattern data", function(){
      expect(view.el).toEqual('tr');

      var columns = view.$('td');
      expect(columns.length).toEqual(4);
      expect(columns[0]).toContainText('My match text');
      expect(columns[1]).toContainText('My Notes');
      expect(columns[2]).toContainText('Category2');
      expect(columns[3]).toContainText('Subcategory2');
    });

    it("row is clickable", function(){
      expect(view.el).toHaveClass('clickable');
    });

    it("when clicked displays an edit view and is no longer clickable", function(){
      expect(view.editView).not.toBeDefined();
      view.$el.click();
      expect(view.editView).toBeDefined();
      expect(view.el).not.toHaveClass('clickable');
    });
  });

  describe("render with no subcategory", function(){
    it("renders successfully", function(){
      view.model.set('subcategory_id', null);
      view.render();
      expect(view.el).toEqual('tr');
      expect(view.$('td')[3]).toHaveText('');
    });
  });

  describe('after edit event', function(){
    beforeEach(function(){
      view.render();
    });
    it("sets class to clickable", function(){
      expect(view.el).toHaveClass('clickable');
      view.$el.click();
      expect(view.el).not.toHaveClass('clickable');
      view.$('#cancel').click();
      expect(view.el).toHaveClass('clickable');
    });

    it('refreshes the view if model is changed', function(){
      expect(view.$('td')[1]).toContainText('My Notes');
      view.model.set({notes: 'New Notes'});
      view.afterEdit();
      expect(view.$('td')[1]).toContainText('New Notes');
    });

    it('removes the view if model is deleted', function(){
      spyOn(view, 'remove');
      view.model.setDestroyed();
      view.afterEdit();
      expect(view.remove).toHaveBeenCalled();
    });
  });
});