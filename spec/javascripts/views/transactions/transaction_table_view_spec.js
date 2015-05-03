describe("TransactionTableView", function(){
  var view, account, transaction, transactions, categories, subcategories, categoryTypes;
  beforeEach(function(){
    account = new MyMoney.Models.Account({id: 2, name: 'My Account', bank: 'My Bank'});
    categoryTypes = new MyMoney.Collections.CategoryTypesCollection([
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
      account_id: 2,
      date: formatDate((new Date()).toDateString()),
      amount: 500,
      memo: 'This is a memo',
      notes: 'This is a note',
      category_id: 3,
      subcategory_id: 5,
      balance: 4000,
      reconciliation_id: 4
    });
    transactions = new MyMoney.Collections.TransactionsCollection([transaction]);

    view = new MyMoney.Views.TransactionTableView({
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
    expect(view.collection).toEqual(transactions);
    expect(view.account).toEqual(account);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a panel with table", function(){
      expect(view.el).toContainElement('.panel');
      expect(view.$('.panel-heading')).toContainText('Transactions for My Account (My Bank)');
      expect(view.$('.panel')).toContainElement('table');
    });

    it('has a new button if account exists', function(){
      expect(view.el).toContainElement('button#new');
    });

    it('has no new button if account is not given', function(){
      view.account = null;
      view.render();
      expect(view.el).not.toContainElement('button#new');
    });

    it ('has rows', function(){
      expect(view.$('tbody tr').length).toEqual(1)
    });
  });

  describe('new model', function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a new edit view", function(){
      expect(view.editView).not.toBeDefined();
      view.$('#new').click();
      expect(view.editView).toBeDefined();
      expect(view.editView.model.isNew()).toBeTruthy();
      expect(view.editView.model.get('account_id')).toEqual(2);
      expect(view.editView.collection).toEqual(transactions);
      expect(view.editView.categoryTypes).toEqual(categoryTypes);
      expect(view.editView.categories).toEqual(categories);
      expect(view.editView.subcategories).toEqual(subcategories);
    });

    it("disables the new button", function(){
      view.$('#new').click();
      expect(view.$('#new').attr('disabled')).toEqual('disabled');
    });
  });
});