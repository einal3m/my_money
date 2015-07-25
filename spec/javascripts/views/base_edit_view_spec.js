describe("MyMoney.Views.BaseEditView", function(){
  var view, categories, subcategories, categoryTypes;
  beforeEach(function(){
    categoryTypes = new MyMoney.Collections.CategoryTypes([
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
  beforeEach(function(){
    view.render();
  });

  describe('click events', function(){
    describe('save existing model', function(){
      it('with valid attributes', function(){
        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.model, 'save');
        spyOn(view, 'setModelAttributes');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.setModelAttributes).toHaveBeenCalled();
        expect(view.model.save).toHaveBeenCalled();
      });

      it('with invalid attributes', function(){
        spyOn(view.model, 'isValid').and.returnValue(false);
        spyOn(view.model, 'save');
        spyOn(view, 'setModelAttributes');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.setModelAttributes).toHaveBeenCalled();
        expect(view.model.save).not.toHaveBeenCalled();
      });
    });

    describe('save new model', function(){
      beforeEach(function(){
        view.model = new MyMoney.Models.Category();
      });

      it('with valid attributes', function(){
        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.collection, 'create');
        spyOn(view, 'setModelAttributes');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.setModelAttributes).toHaveBeenCalled();
        expect(view.collection.create).toHaveBeenCalled();
      });

      it('with invalid attributes', function(){
        spyOn(view.model, 'isValid').and.returnValue(false);
        spyOn(view.collection, 'create');
        spyOn(view, 'setModelAttributes');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.setModelAttributes).toHaveBeenCalled();
        expect(view.collection.create).not.toHaveBeenCalled();
      });
    });

    it('cancel, restores the server state and triggers cancel', function(){
      spyOn(view, 'remove');
      spyOn(view.model, 'restoreSavedState');
      spyOn(view, 'trigger');
      view.$('#cancel').click();
      expect(view.remove).toHaveBeenCalled();
      expect(view.model.restoreSavedState).toHaveBeenCalled();
      expect(view.trigger).toHaveBeenCalledWith('cancel');
    });

    describe('delete', function(){
      it("confirmed", function(){
        spyOn(view.model, "destroy");
        spyOn(view, 'confirmDelete').and.returnValue(true);
        view.$('#delete').click();
        expect(view.model.destroy).toHaveBeenCalled();
        expect(view.confirmDelete).toHaveBeenCalled();
      });

      it("not confirmed", function(){
        spyOn(view.model, 'destroy');
        spyOn(view, 'confirmDelete').and.returnValue(false);
        view.$('#delete').click();
        expect(view.model.destroy).not.toHaveBeenCalled();
        expect(view.confirmDelete).toHaveBeenCalled();
      });
    });
  });

  describe('callbacks', function(){
    beforeEach(function(){
      spyOn(view, 'setModelAttributes');
      view.model = new ModelStub();
    });

    it('error on delete, shows error message', function(){
      spyOn(view, 'confirmDelete').and.returnValue(true);
      view.model.simulate('error', {status: 422, responseText: '{"message":"There was an error"}'});
      view.$('#delete').click();
      expect(view.$('.errors')).not.toHaveClass('hidden');
      expect(view.$('.alert-message')).toHaveText('There was an error');
    });
    
    it('error on save (new), shows error message', function(){
      view.collection = new CollectionStub();
      spyOn(view.model, 'isNew').and.returnValue(true);
      view.collection.simulate('error', {status: 422, responseText: '{"message":"There was an error"}'});
      view.$('#save').click();
      expect(view.$('.errors')).not.toHaveClass('hidden');
      expect(view.$('.alert-message')).toHaveText('There was an error');
    });

    it('error on save (update), shows error message', function(){
      view.model.simulate('error', {status: 422, responseText: '{"message":"There was an error"}'});
      view.$('#save').click();
      expect(view.$('.errors')).not.toHaveClass('hidden');
      expect(view.$('.alert-message')).toHaveText('There was an error');
    });
  });

  function ModelStub() {
    return {
      isNew: function(){
        return false;
      },
      isValid: function() {
        return true;
      },
      save: function (attrs, options) {
        if (this.respondWith) {
          options[this.respondWith](this, this.response);
        }
      },
      destroy: function (options) {
        if (this.respondWith) {
          options[this.respondWith](this, this.response);
        }
      },
      simulate: function (action, response) {
        this.respondWith = action;
        this.response = response;
      }
    };
  }

  function CollectionStub() {
    return {
      create: function (attrs, options) {
        if (this.respondWith) {
          options[this.respondWith](this, this.response);
        }
      },
      simulate: function (action, response) {
        this.respondWith = action;
        this.response = response;
      }
    };
  }
});
