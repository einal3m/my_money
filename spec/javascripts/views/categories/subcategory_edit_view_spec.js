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

    describe("events", function(){
      it("save with valid attributes", function(){
        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.model, "save");
        view.$('#category_id').val('4');
        view.$('#name').val('New Name');
        view.$('#save').click();
        expect(view.model.get('name')).toEqual('New Name');
        expect(view.model.get('category_id')).toEqual(4);
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.save).toHaveBeenCalled();
      });

      it("save with invalid attributes", function(){
        spyOn(view.model, 'isValid').and.returnValue(false);
        spyOn(view.model, 'save');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.save).not.toHaveBeenCalled();
      });

      it('save with new model', function(){
        view.model = new MyMoney.Models.Category({
          category_type_id: 1,
          name: 'Bob'
        });
        view.collection = categories;

        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.collection, 'create');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.collection.create).toHaveBeenCalled();
      });

      it("delete confirmed", function(){
        spyOn(view.model, "destroy");
        spyOn(view, 'confirmDelete').and.returnValue(true);
        view.$('#delete').click();
        expect(view.model.destroy).toHaveBeenCalled();
        expect(view.confirmDelete).toHaveBeenCalled();
      });

      it("delete not confirmed", function(){
        spyOn(view.model, 'destroy');
        spyOn(view, 'confirmDelete').and.returnValue(false);
        view.$('#delete').click();
        expect(view.model.destroy).not.toHaveBeenCalled();
        expect(view.confirmDelete).toHaveBeenCalled();
      });

      it("cancel", function(){
        spyOn(view, 'remove');
        spyOn(view.model, 'restoreSavedState');
        spyOn(view, 'trigger');
        view.$('#cancel').click();
        expect(view.remove).toHaveBeenCalled();
        expect(view.model.restoreSavedState).toHaveBeenCalled();
        expect(view.trigger).toHaveBeenCalledWith('cancel');
      });
    });
  });
});

