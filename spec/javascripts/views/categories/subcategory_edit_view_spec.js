describe("SubcategoryEditView", function(){
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

    view = new MyMoney.Views.SubcategoryEditView({
      model: subcategory,
      collection: subcategories,
      categories: categories,
      categoryTypes: categoryTypes
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(subcategory);
    expect(view.collection).toEqual(subcategories);
    expect(view.categories).toEqual(categories);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.model.savedState).toBeDefined();
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a table row with pattern form", function(){
      expect(view.el).toEqual('tr');
      expect(view.el).toContainElement('select#category_id');
      expect(view.el).toContainElement('input#name');
      expect(view.el).toContainElement('button#cancel');
      expect(view.el).toContainElement('button#save');
    });

    it("displays a delete button if model is not new", function(){
      expect(view.el).toContainElement('button#delete');
    });

    it("doesn't display a delete button if model is new", function(){
      view.model = new MyMoney.Models.Subcategory();
      view.render();
      expect(view.el).not.toContainElement('button#delete');
    });

    describe('setModelAttributes', function(){
      it('updates model with view values', function(){
        view.$('#category_id').val('4');
        view.$('#name').val('New Name');
        view.setModelAttributes();
        expect(view.model.get('name')).toEqual('New Name');
        expect(view.model.get('category_id')).toEqual(4);
      });
    });
  });
});
