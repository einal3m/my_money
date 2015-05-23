describe("TransactionEditView", function(){
  var view, account, categories, subcategories, categoryTypes, transaction, transactions;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      account_type_id: 1
    });
    categoryTypes = new MyMoney.Collections.CategoryTypes([
      {id: 1, name: 'Category Type'}
    ]);    
    categories = new MyMoney.Collections.Categories([
      {id: 3, name: 'Category1', category_type_id: 1},
      {id: 4, name: 'Category2', category_type_id: 1}      
    ]);
    subcategories = new MyMoney.Collections.Subcategories([
      {id: 5, name: 'Subcategory1', category_id: 3},
      {id: 6, name: 'Subcategory2', category_id: 4}      
    ]);
    transaction = new MyMoney.Models.Transaction({
      id: 7, 
      account_id: 1,
      date: formatDate((new Date()).toDateString()),
      amount: 500,
      memo: 'This is a memo',
      notes: 'This is a note',
      category_id: 3,
      subcategory_id: 5,
      balance: 4000,
      reconciliation_id: 4
    })
    transactions = new MyMoney.Collections.Transactions([transaction]);

    view = new MyMoney.Views.TransactionEditView({
      model: transaction,
      account: account,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(transaction);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    describe('savings', function(){
      it("displays a table row with transaction form", function(){
        expect(view.el).toEqual('tr');
        expect(view.el).toContainElement('.form-horizontal');
        expect(view.el).toContainElement('input#amount');
        expect(view.el).toContainElement('input#date');
        expect(view.el).toContainElement('input#notes');
        expect(view.el).toContainElement('select#category_id');
        expect(view.el).toContainElement('select#subcategory_id');
        expect(view.el).toContainElement('button#cancel');
        expect(view.el).toContainElement('button#save');
      });
    });

    describe('shares', function(){
      it('displays a table row with share form', function(){
        view.account.set({account_type_id: 2});
        view.setTemplate();
        view.render();
        expect(view.el).toEqual('tr');
        expect(view.el).toContainElement('.form-horizontal');
        expect(view.el).toContainElement('select#transaction_type_id');
        expect(view.el).toContainElement('button#cancel');
        expect(view.el).toContainElement('button#save');
      });
    });

    it("displays a delete button if model is not new", function(){
      expect(view.el).toContainElement('button#delete');
    });

    it("doesn't display a delete button if model is new", function(){
      view.model = new MyMoney.Models.Transaction();
      view.render();
      expect(view.el).not.toContainElement('button#delete');
    });

    describe("events", function(){
      it("save with valid attributes", function(){
        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.model, "save");
        view.$('#date').val('1-Jan-2015');
        view.$('#amount').val('52.14');
        view.$('#category_id').val('4').change();
        view.$('#subcategory_id').val('6');
        view.$('#notes').val('New Notes');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.save).toHaveBeenCalled();
        expect(view.model.get('date')).toEqual('1-Jan-2015');
        expect(view.model.get('amount')).toEqual(5214);
        expect(view.model.get('category_id')).toEqual(4);
        expect(view.model.get('subcategory_id')).toEqual(6);
        expect(view.model.get('notes')).toEqual('New Notes');
      });

      it("save with invalid attributes", function(){
        spyOn(view.model, 'isValid').and.returnValue(false);
        spyOn(view.model, 'save');
        view.$('#save').click();
        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.save).not.toHaveBeenCalled();
      });

      it('save with new model', function(){
        view.model = new MyMoney.Models.Transaction({
          date: formatDate((new Date()).toDateString()),
          amount: 500,
          memo: 'This is a memo',
          notes: 'This is a note',
          category_id: 3,
          subcategory_id: 5,
          balance: 4000,
          reconciliation_id: 4
        });
        view.collection = transactions;

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

