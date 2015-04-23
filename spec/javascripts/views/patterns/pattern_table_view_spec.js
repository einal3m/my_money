describe("PatternTableView", function(){
  var view, categories, subcategories, categoryTypes, patterns;
  beforeEach(function(){
    patterns = new MyMoney.Collections.Patterns([{
      id: 12,
      account_id: 17,
      match_text: 'My match text',
      notes: 'My Notes',
      category_id: 4,
      subcategory_id: 6
    }], { account_id: 17 });
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

    view = new MyMoney.Views.PatternTableView({
      collection: patterns,
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
    expect(view.collection).toEqual(patterns);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a panel with table", function(){
      expect(view.el).toContainElement('.panel');
      expect(view.$('.panel-heading')).toContainText('Patterns');
      expect(view.$('.panel')).toContainElement('table');
      expect(view.$('table.patterns tbody tr').length).toEqual(1);
    });

    it('has a new button', function(){
      expect(view.el).toContainElement('button#new');
    });

    it("table has columns", function(){
      var columns = view.$('th');
      expect(columns.length).toEqual(4);
      expect(columns[0]).toContainText('Match Text');
      expect(columns[1]).toContainText('Notes');
      expect(columns[2]).toContainText('Category');
      expect(columns[3]).toContainText('Subcategory');
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
      expect(view.editView.el).not.toContainElement('button#delete');
      expect(view.editView.collection.account_id).toEqual(17);
      expect(view.editView.model.get('id')).not.toBeDefined();
    });

    it("disables the new button", function(){
      view.$('#new').click();
      expect(view.$('#new').attr('disabled')).toEqual('disabled');
    });
  });

  // xdescribe('after new event', function(){
  //   beforeEach(function(){
  //     view.render();
  //   });
  //   it('renders the model if saved', function(){
  //     view.afterEdit();
  //     expect(view.$('td')[1]).toContainText('New Notes');
  //   });

  //   it('removes the view if model is deleted', function(){
  //     view.afterEdit();
  //     expect(view.$('#new').prop('disabled')).toBeFalsy();
  //   });
  // });
});