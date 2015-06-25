describe("MyMoney.Views.TransactionEditView", function(){
  var view, account, categories, subcategories, categoryTypes, transaction, transactions;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      account_type: 'savings'
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
    });
    transactions = new MyMoney.Collections.Transactions([transaction]);
    transactionTypes = new MyMoney.Collections.TransactionTypes([
      {id: 1, account_type: 'share', name: 'Purchase'},
      {id: 2, account_type: 'share', name: 'Dividend'},
      {id: 3, account_type: 'share', name: 'Unit Price Update'},
      {id: 4, account_type: 'share', name: 'Sale'},
    ]);

    view = new MyMoney.Views.TransactionEditView({
      model: transaction,
      account: account,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories,
      transactionTypes: transactionTypes
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(transaction);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
    expect(view.transactionTypes).toEqual(transactionTypes);
  });

  it('defaults to savings if no account defined', function(){
    view.account = undefined;
    view.setTemplate();
    expect(view.template).toEqual('transactions/savings_form');
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
      it('#setModelAttributes', function(){
        view.$('#amount').val('60.00');
        view.$('#date').val('1-Jan-2014');
        view.$('#notes').val('New Note');
        view.$('#category_id').val(4).change();
        view.$('#subcategory_id').val(6);

        view.setModelAttributes();

        expect(view.model.get('amount')).toEqual(6000);
        expect(view.model.get('date')).toEqual('1-Jan-2014');
        expect(view.model.get('notes')).toEqual('New Note');
        expect(view.model.get('category_id')).toEqual(4);
        expect(view.model.get('subcategory_id')).toEqual(6);
      });
    });

    describe('shares', function(){
      beforeEach(function(){
        view.account.set({account_type: 'share'});
        view.setTemplate();
        view.render();
      });
      it('re-renders when transaction type changed', function(){
        spyOn(view, 'render');
        view.$('#transaction_type_id').val('4').change();
        expect(view.render).toHaveBeenCalled();
        expect(view.model.get('transaction_type_id')).toEqual(4);
      });

      it('displays a table row with share form', function(){
        expect(view.el).toEqual('tr');
        expect(view.el).toContainElement('.form-horizontal');
        expect(view.el).toContainElement('select#transaction_type_id');
        expect(view.el).toContainElement('button#cancel');
        expect(view.el).toContainElement('button#save');
      });

      describe('purchase', function(){
        beforeEach(function(){
          view.$('#transaction_type_id').val('1').change();
        })

        it('displays form data', function(){
          expect(view.el).toContainElement('input#date');
          expect(view.el).toContainElement('input#quantity');
          expect(view.el).toContainElement('input#unit_price');
          expect(view.el).toContainElement('input#notes');
        });

        it('#setModelAttributes', function(){
          view.$('#date').val('1-Jan-2014');
          view.$('#notes').val('New Note');
          view.$('#unit_price').val('1.20');
          view.$('#quantity').val('100');

          view.setModelAttributes();

          expect(view.model.get('date')).toEqual('1-Jan-2014');
          expect(view.model.get('notes')).toEqual('New Note');
          expect(view.model.get('unit_price')).toEqual(120);
          expect(view.model.get('quantity')).toEqual(100);
          expect(view.model.get('amount')).toEqual(12000);
        });
      });
      describe('dividend', function(){
        beforeEach(function(){
          view.$('#transaction_type_id').val('2').change();
        })

        it('displays form data', function(){
          expect(view.el).toContainElement('input#date');
          expect(view.el).toContainElement('input#amount');
          expect(view.el).toContainElement('input#notes');
        });

        it('#setModelAttributes', function(){
          view.$('#date').val('1-Jan-2014');
          view.$('#notes').val('New Note');
          view.$('#amount').val('$50.00');

          view.setModelAttributes();

          expect(view.model.get('date')).toEqual('1-Jan-2014');
          expect(view.model.get('notes')).toEqual('New Note');
          expect(view.model.get('amount')).toEqual(5000);
        });
      });
      describe('price update', function(){
        beforeEach(function(){
        view.$('#transaction_type_id').val('3').change();
        })

        it('displays form data', function(){
          expect(view.el).toContainElement('input#date');
          expect(view.el).toContainElement('input#unit_price');
          expect(view.el).toContainElement('input#notes');
        });

        it('#setModelAttributes', function(){
          view.$('#date').val('1-Jan-2014');
          view.$('#notes').val('New Note');
          view.$('#unit_price').val('1.20');

          view.setModelAttributes();

          expect(view.model.get('date')).toEqual('1-Jan-2014');
          expect(view.model.get('notes')).toEqual('New Note');
          expect(view.model.get('unit_price')).toEqual(120);
          expect(view.model.get('amount')).toEqual(0);
        });
      });
      describe('sale', function(){
        beforeEach(function(){
        view.$('#transaction_type_id').val('4').change();
        })

        it('displays form data', function(){
          expect(view.el).toContainElement('input#date');
          expect(view.el).toContainElement('input#quantity');
          expect(view.el).toContainElement('input#unit_price');
          expect(view.el).toContainElement('input#notes');
        });

        it('#setModelAttributes', function(){
          view.$('#date').val('1-Jan-2014');
          view.$('#notes').val('New Note');
          view.$('#unit_price').val('1.20');
          view.$('#quantity').val('100');

          view.setModelAttributes();

          expect(view.model.get('date')).toEqual('1-Jan-2014');
          expect(view.model.get('notes')).toEqual('New Note');
          expect(view.model.get('unit_price')).toEqual(120);
          expect(view.model.get('quantity')).toEqual(-100);
          expect(view.model.get('amount')).toEqual(-12000);
        });
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

