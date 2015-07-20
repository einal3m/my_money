describe("MyMoney.Views.ImportTransactionSelectView", function(){
  var view, account, transactions, categories, subcategories, categoryTypes;
  beforeEach(function(){
    account = new MyMoney.Models.Account({id: 17, name: 'My Account'});
    bankStatement = new MyMoney.Models.BankStatement({file_name: 'file.ofx'});
    categoryTypes = new MyMoney.Collections.CategoryTypes([]);
    categories = new MyMoney.Collections.Categories([]);
    subcategories = new MyMoney.Collections.Subcategories([]);
    transactions = new MyMoney.Collections.Transactions([
      {id: 2, date: '2014-09-02', memo: 'Memo1', amount: 2001, 'import': false},
      {id: 4, date: '2014-09-01', memo: 'Memo2', amount: 123, 'import': true}      
    ], {account_id: 17});

    view = new MyMoney.Views.ImportTransactionSelectView({
      model: bankStatement,
      collection: transactions,
      account: account,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.account).toEqual(account);
    expect(view.model).toEqual(bankStatement);
    expect(view.collection).toEqual(transactions);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays step 2 of the import view", function(){
      expect(view.el).toContainText('Step 2 of 2');
    });

    it('displays a table', function(){
      expect(view.$('tbody tr').length).toEqual(2);
    });

    describe('on click', function(){
      it('import, saves the selected transactions', function(){
        var transactions = jasmine.createSpyObj('bankStatement', ['save']);
        spyOn(view.model, 'save')
        spyOn(view, 'filteredTransactions').and.returnValue(transactions);
        view.$('#upload').click();
        expect(view.model.get('transactions')).toEqual(transactions);
        expect(view.model.save).toHaveBeenCalledWith({}, {success: view.success});
      });

      it('alert when no transactions selected', function(){
        transactions = new MyMoney.Collections.Transactions([]);
        spyOn(view, 'filteredTransactions').and.returnValue(transactions);
        spyOn(transactions, 'save');
        spyOn(window, 'alert');
        view.$('#upload').click();
        expect(window.alert).toHaveBeenCalled();
        expect(transactions.save).not.toHaveBeenCalled();
      });

      it('cancel', function(){
        spyOn(view, 'navigateToTransactions');
        view.$('#cancel').click();
        expect(view.navigateToTransactions).toHaveBeenCalled();
      });

      it('#navigateToTransactions', function(){
        window.router = jasmine.createSpyObj('router', ['navigate']);
        view.navigateToTransactions();
        expect(window.router.navigate).toHaveBeenCalledWith('accounts/17/transactions', {trigger: true});
      });
    });
  });

  it('filteredTransactions', function(){
    var filteredTransactions = view.filteredTransactions();
    expect(filteredTransactions.at(0)).toEqual(transactions.at(1));
  });
});
