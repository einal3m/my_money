describe("SubcategoryRowView", function(){
  var view, categories, subcategory, subcategories, categoryTypes;
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
    subcategory = new MyMoney.Models.Subcategory({id: 5, name: 'Subcategory1', category_id: 3});
    subcategories = new MyMoney.Collections.Subcategories([subcategory]);

    view = new MyMoney.Views.SubcategoryRowView({
      model: subcategory,
      collection: subcategories,
      categories: categories,
      categoryTypes: categoryTypes
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(subcategory);
    expect(view.collection).toEqual(subcategories);
    expect(view.categories).toEqual(categories);
    expect(view.categoryTypes).toEqual(categoryTypes);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a table row with subcategory name", function(){
      expect(view.el).toEqual('tr');
      expect(view.el).toContainText('Subcategory1');
    });

    it("displays 'New...' if model is undefined", function(){
      view.model = new MyMoney.Models.Subcategory();
      view.render();
      expect(view.el).toContainText('New...');
    });

    it("row is clickable", function(){
      expect(view.el).toHaveClass('clickable');
    });

    it("when clicked displays an edit view and is no longer clickable", function(){
      expect(view.editView).not.toBeDefined();
      view.$el.click();
      expect(view.editView).toBeDefined();
      expect(view.editView.model).toEqual(subcategory);
      expect(view.editView.collection).toEqual(subcategories);
      expect(view.editView.categories).toEqual(categories);
      expect(view.editView.categoryTypes).toEqual(categoryTypes);
      expect(view.el).not.toHaveClass('clickable');
    });
  });

  describe('after edit event', function(){
    beforeEach(function(){
      view.render();
    });

    it("sets class to clickable", function(){
      expect(view.el).toHaveClass('clickable');
      expect(view.el).not.toHaveClass('editing');
      view.$el.click();
      expect(view.el).not.toHaveClass('clickable');
      expect(view.el).toHaveClass('editing');
      view.$('button#cancel').click();
      expect(view.el).toHaveClass('clickable');
      expect(view.el).not.toHaveClass('editing');
    });
  });
});