describe("CategoryEditView", function(){
  var view, account, categories, subcategories, categoryTypes, pattern, patterns;
  beforeEach(function(){
    categoryTypes = new MyMoney.Collections.CategoryTypesCollection([
      {id: 1, name: 'Income'},
      {id: 2, name: 'Expense'}
    ]);
    category = new MyMoney.Models.Category({ id: 2, category_type_id: 1 });
    categories = new MyMoney.Collections.Categories([]);

    view = new MyMoney.Views.CategoryEditView({
      model: category,
      collection: categories,
      categoryTypes: categoryTypes
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(category);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.collection).toEqual(categories);
    expect(view.model.savedState).toBeDefined();
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a table row with pattern form", function(){
      expect(view.el).toEqual('tr');
      expect(view.el).toContainElement('.form-horizontal');
      expect(view.el).toContainElement('select#category_type_id');
      expect(view.el).toContainElement('input#name');
      expect(view.el).toContainElement('button#cancel');
      expect(view.el).toContainElement('button#save');
    });

    it("displays a delete button if model is not new", function(){
      expect(view.el).toContainElement('button#delete');
    });

    it("doesn't display a delete button if model is new", function(){
      view.model = new MyMoney.Models.Category();
      view.render();
      expect(view.el).not.toContainElement('button#delete');
    });

    describe("events", function(){
      it("save with valid attributes", function(){
        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.model, "save");
        view.$('#category_type_id').val('2');
        view.$('#name').val('New Name');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.save).toHaveBeenCalled();
        expect(view.model.get('category_type_id')).toEqual(2);
        expect(view.model.get('name')).toEqual('New Name');
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

