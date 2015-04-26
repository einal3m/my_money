describe("PatternEditView", function(){
  var view, account, categories, subcategories, categoryTypes, pattern, patterns;
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
    patterns = new MyMoney.Collections.Patterns([pattern], {account_id: 13});

    categoryTypes = new MyMoney.Collections.CategoryTypesCollection([
      {id: 1, name: 'Income'},
      {id: 2, name: 'Expense'}
    ]);
    categories = new MyMoney.Collections.Categories([
      {id: 3, name: 'Category1', category_type_id: 1},
      {id: 4, name: 'Category2', category_type_id: 2}
    ]);
    subcategories = new MyMoney.Collections.Subcategories([
      {id: 5, name: 'Subcategory1', category_id: 3},
      {id: 6, name: 'Subcategory2', category_id: 4}
    ]);

    view = new MyMoney.Views.PatternEditView({
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
    expect(view.viewSubcategories.length).toEqual(1);
    expect(view.viewSubcategories[0]).toEqual(subcategories.at(1));
    expect(view.model.savedState).toBeDefined();
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a table row with pattern form", function(){
      expect(view.el).toEqual('tr');
      expect(view.el).toContainElement('.form-horizontal');

      expect(view.el).toContainElement('input#match_text');
      expect(view.el).toContainElement('input#notes');
      expect(view.el).toContainElement('select#category_id');
      expect(view.el).toContainElement('select#subcategory_id');

      expect(view.el).toContainElement('button#cancel');
      expect(view.el).toContainElement('button#save');
    });

    it("displays a delete button if model is not new", function(){
      expect(view.el).toContainElement('button#delete');
    });

    it("doesn't display a delete button if model is new", function(){
      view.model = new MyMoney.Models.Pattern();
      view.render();
      expect(view.el).not.toContainElement('button#delete');
    });

    describe("categories", function(){
      it("displays categories", function(){
        expect(view.$('#category_id option').length).toEqual(2);
        expect(view.$('#category_id option')[0].text).toEqual('Category1');
        expect(view.$('#category_id option')[1].text).toEqual('Category2');
      });

      it("displays subcategories only for selected category", function(){
        expect(view.$('#subcategory_id option').length).toEqual(2);
        expect(view.$('#subcategory_id option')[0].text).toEqual('Un-assigned');
        expect(view.$('#subcategory_id option')[1].text).toEqual('Subcategory2');
      });

      it("updates subcategory list", function(){
        view.$('#category_id').val('3').change();
        expect(view.viewSubcategories.length).toEqual(1);
        expect(view.viewSubcategories[0]).toEqual(subcategories.at(0));
        expect(view.$('#subcategory_id option').length).toEqual(2);
        expect(view.$('#subcategory_id option')[0].text).toEqual('Un-assigned');
        expect(view.$('#subcategory_id option')[1].text).toEqual('Subcategory1');
      });
    });

    describe("events", function(){
      it("save with valid attributes", function(){
        spyOn(view, 'remove');
        spyOn(view, 'trigger');
        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.model, 'save').and.callFake(simulateModelSync);
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.save).toHaveBeenCalled();
        expect(view.remove).toHaveBeenCalled();
        expect(view.trigger).toHaveBeenCalledWith('cancelEdit');
      });

      it("save with invalid attributes", function(){
        spyOn(view, 'remove');
        spyOn(view, 'trigger');
        spyOn(view.model, 'isValid').and.returnValue(false);
        spyOn(view.model, 'save');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.save).not.toHaveBeenCalled();
        expect(view.remove).not.toHaveBeenCalled();
        expect(view.trigger).not.toHaveBeenCalled();
      });

      xit('save with new model', function(){
        view.model = new MyMoney.Models.Pattern({
          match_text: 'My match text',
          notes: 'My Notes',
          category_id: 4,
          subcategory_id: 6
        });
        view.collection = patterns;

        spyOn(view, 'remove');
        spyOn(view, 'trigger');
        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.collection, 'create').and.callFake(simulateCollectionSync);
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.collection.create).toHaveBeenCalled();
        expect(view.remove).toHaveBeenCalled();
        expect(view.trigger).toHaveBeenCalledWith('cancelEdit');
      });

      it("delete confirmed", function(){
        spyOn(view, 'remove');
        spyOn(view, 'trigger');
        spyOn(view.model, 'destroy').and.callFake(simulateModelSync);
        spyOn(view, 'confirmDelete').and.returnValue(true);
        view.$('#delete').click();
        expect(view.model.destroy).toHaveBeenCalled();
        expect(view.remove).toHaveBeenCalled();
        expect(view.confirmDelete).toHaveBeenCalled();
        expect(view.trigger).toHaveBeenCalledWith('cancelEdit');
        expect(view.model.isDestroyed()).toBeTruthy();
      });

      it("delete not confirmed", function(){
        spyOn(view, 'remove');
        spyOn(view, 'trigger');
        spyOn(view.model, 'destroy');
        spyOn(view, 'confirmDelete').and.returnValue(false);
        view.$('#delete').click();
        expect(view.model.destroy).not.toHaveBeenCalled();
        expect(view.remove).not.toHaveBeenCalled();
        expect(view.confirmDelete).toHaveBeenCalled();
        expect(view.trigger).not.toHaveBeenCalledWith('cancelEdit');
      });

      it("cancel", function(){
        spyOn(view, 'remove');
        spyOn(view, 'trigger');
        spyOn(view.model, 'restoreSavedState');
        view.$('#cancel').click();
        expect(view.remove).toHaveBeenCalled();
        expect(view.trigger).toHaveBeenCalledWith('cancelEdit');
        expect(view.model.restoreSavedState).toHaveBeenCalled();
      });

      function simulateModelSync(_method, _model, options) {
        view.model.trigger('sync');
      }
      function simulateCollectionSync(_method, _model, options) {
        view.collection.trigger('sync');
      }
    });
  });
});

