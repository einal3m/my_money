describe("MyMoney.Views.TransactionRowView", function(){
  var view, account, transaction, transactions, categories, subcategories, categoryTypes, transactionTypes;
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
      date: formatDate((new Date()).toDateString()),
      amount: 500,
      memo: 'This is a memo',
      notes: 'This is a note',
      category_id: 3,
      subcategory_id: 5,
      balance: 4000,
      reconciliation_id: 4
    });
    transactionTypes = new MyMoney.Collections.TransactionTypes([]);

    view = new MyMoney.Views.TransactionRowView({
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
    expect(view.account).toEqual(account);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
    expect(view.transactionTypes).toEqual(transactionTypes);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    describe('savings', function(){
      it("displays a table row with transaction details", function(){
        expect(view.el).toEqual('tr');

        var columns = view.$('td');
        expect(columns.length).toEqual(7);
        expect(columns[0]).toContainText(transaction.get('date'));
        expect(columns[1]).toContainText('This is a memo/This is a note');
        expect(columns[1]).toContainText('Category1/Subcategory1');
        expect(columns[2]).toContainText('R');
        expect(columns[3]).toContainText('5.00');
        expect(columns[5]).toContainText('$40.00');
      });
    });

    describe('shares', function(){
      beforeEach(function(){
        view.account.set({
          account_type: 'share'
        });
      });

      describe('purchase', function(){
        it("displays a table row with transaction details", function(){
          view.model.set({
            transaction_type_id: 1,
            unit_price: 50,
            quantity: 10
          });
          view.setTemplate();
          view.render();

          expect(view.el).toEqual('tr');
          var columns = view.$('td');
          expect(columns.length).toEqual(7);
          expect(columns[0]).toContainText(transaction.get('date'));
          expect(columns[1]).toContainText('Purchase 10 @ $0.50');
          expect(columns[1]).toContainText('This is a note');
          expect(columns[2]).toContainText('R');
          expect(columns[3]).toContainText('5.00');
          expect(columns[5]).toContainText('$40.00');
        });
      });

      describe('sales', function(){
        it("displays a table row with transaction details", function(){
          view.model.set({
            transaction_type_id: 4,
            unit_price: 50,
            quantity: 10
          });
          view.setTemplate();
          view.render();

          expect(view.el).toEqual('tr');
          var columns = view.$('td');
          expect(columns.length).toEqual(7);
          expect(columns[0]).toContainText(transaction.get('date'));
          expect(columns[1]).toContainText('Sale 10 @ $0.50');
          expect(columns[1]).toContainText('This is a note');
          expect(columns[2]).toContainText('R');
          expect(columns[3]).toContainText('5.00');
          expect(columns[5]).toContainText('$40.00');
        });
      });
      describe('dividend', function(){
        it("displays a table row with transaction details", function(){
          view.model.set({
            transaction_type_id: 2
          });
          view.setTemplate();
          view.render();

          expect(view.el).toEqual('tr');
          var columns = view.$('td');
          expect(columns.length).toEqual(7);
          expect(columns[0]).toContainText(transaction.get('date'));
          expect(columns[1]).toContainText('Dividend of $5.00');
          expect(columns[1]).toContainText('This is a note');
          expect(columns[2]).toContainText('R');
          expect(columns[3]).toContainText('5.00');
          expect(columns[5]).toContainText('$40.00');
        });
      });
      describe('price update', function(){
        it("displays a table row with transaction details", function(){
          view.model.set({
            transaction_type_id: 3,
            unit_price: 50
          });
          view.setTemplate();
          view.render();

          expect(view.el).toEqual('tr');
          var columns = view.$('td');
          expect(columns.length).toEqual(7);
          expect(columns[0]).toContainText(transaction.get('date'));
          expect(columns[1]).toContainText('Unit price update');
          expect(columns[1]).toContainText('This is a note');
          expect(columns[2]).toContainText('R');
          expect(columns[3]).toContainText('5.00');
          expect(columns[5]).toContainText('$40.00');
        });
      });
    });

    describe('reports', function(){
      it("displays a table row with transaction details", function(){
        view.account = undefined;
        view.setTemplate();
        view.render();
        expect(view.el).toEqual('tr');

        var columns = view.$('td');
        expect(columns.length).toEqual(7);
        expect(columns[0]).toContainText(transaction.get('date'));
        expect(columns[1]).toContainText('This is a memo/This is a note');
        expect(columns[1]).toContainText('Category1/Subcategory1');
        expect(columns[2]).toContainText('R');
        expect(columns[3]).toContainText('5.00');
        expect(columns[5]).not.toContainText('$40.00');
      });
    });

    it("row is clickable", function(){
      expect(view.el).toHaveClass('clickable');
    });

    it("when clicked displays an edit view and is no longer clickable", function(){
      expect(view.editView).not.toBeDefined();
      view.$el.click();
      expect(view.editView).toBeDefined();
      expect(view.editView.model).toEqual(transaction);
      expect(view.editView.account).toEqual(account);
      expect(view.editView.categoryTypes).toEqual(categoryTypes);
      expect(view.editView.categories).toEqual(categories);
      expect(view.editView.subcategories).toEqual(subcategories);
      expect(view.editView.transactionTypes).toEqual(transactionTypes);
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
