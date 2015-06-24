describe("MyMoney.Views.SubcategoryReportView", function(){
  var view, account, accounts, category, subcategory, categories, subcategories, categoryTypes, transactions, transactionTypes;
  beforeEach(function(){
    categoryType = new MyMoney.Models.CategoryType({id: 1, name: 'CategoryType 1'});
    categoryTypes = new MyMoney.Collections.CategoryTypes([categoryType]);
    categories = new MyMoney.Collections.Categories([
      {id: 2, name: 'Category 1', category_type_id: 1},
      {id: 4, name: 'Category 2', category_type_id: 1}
    ]);
    category = categories.at(0);
    subcategories = new MyMoney.Collections.Subcategories([
      {id: 3, name: 'Subcategory 1', category_id: 2},
      {id: 5, name: 'Subcategory 2', category_id: 2}
      ]);
    subcategory = subcategories.at(0);
    currentDateRange = new MyMoney.Models.DateRangeOption({
      id: 1,
      name: 'Test Date Range 1',
      from_date: '1-Jan-2015',
      to_date: '31-Jan-2015'
    });
    anotherDateRange = new MyMoney.Models.DateRangeOption({
      id: 2,
      name: 'Test Date Range 2',
      from_date: '1-Jan-2015',
      to_date: '31-Jan-2015'
    });
    dateRangeOptions = new MyMoney.Collections.DateRangeOptions([currentDateRange, anotherDateRange]);
    monthTotals = [["May-15", 5000]];

    transaction = new MyMoney.Models.Transaction({
      id: 7,
      account_id: 13,
      date: '10-Jan-2015',
      amount: 500,
      memo: 'This is a memo',
      notes: 'This is a note',
      category_id: 2,
      subcategory_id: 3,
      balance: 4000,
      reconciliation_id: 4
    });
    transactions = new MyMoney.Collections.Transactions([transaction]);
    transactionTypes = new MyMoney.Collections.TransactionTypes([]);

    view = new MyMoney.Views.SubcategoryReportView({
      category: category,
      subcategory: subcategory,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories,
      dateRangeOptions: dateRangeOptions,
      currentDateRange: currentDateRange,
      transactionTypes: transactionTypes
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.category).toEqual(category);
    expect(view.subcategory).toEqual(subcategory);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
    expect(view.dateRangeOptions).toEqual(dateRangeOptions);
    expect(view.currentDateRange).toEqual(currentDateRange);
    expect(view.transactionTypes).toEqual(transactionTypes);

    expect(view.collection).not.toBeDefined();
    expect(view.model).not.toBeDefined();
  });

  describe('#fetchData', function(){
    it('with subcategory', function(){
      spyOn(MyMoney.Models.Report.prototype, 'fetch');

      view.fetchData();

      expect(view.model).toEqual(jasmine.any(MyMoney.Models.Report));
      expect(view.model.get('category_id')).toEqual(2);
      expect(view.model.get('subcategory_id')).toEqual(3);
      expect(MyMoney.Models.Report.prototype.fetch).toHaveBeenCalled();
    });

    it('without subcategory or category', function(){
      view.category = null;
      view.subcategory = null;
      spyOn(MyMoney.Models.Report.prototype, 'fetch');

      view.fetchData();

      expect(view.model).toEqual(jasmine.any(MyMoney.Models.Report));
      expect(view.model.get('category_id')).toEqual(null);
      expect(view.model.get('subcategory_id')).toEqual(null);
      expect(MyMoney.Models.Report.prototype.fetch).toHaveBeenCalled();
    });
  });

  describe('render', function(){
    beforeEach(function(){
      view.model = new MyMoney.Models.Report({
        category_id: 2,
        subcategory_id: 3,
        transactions: transactions,
        month_totals: monthTotals
      });
      view.render();
    });

    it("displays the category report page", function(){
      expect(view.$('h1')).toContainText('subcategory report');
    });

    it("displays a category filter", function(){
      expect(view.el).toContainElement('#category_filter');
      expect(view.$('#category_filter').find('#category_id').val()).toEqual(category.id.toString());
      expect(view.$('#category_filter').find('#subcategory_id').val()).toEqual(subcategory.id.toString());
    });

    it("displays a date filter", function(){
      expect(view.el).toContainElement('#date_range_option_id');
      expect(view.$('#date_filter').find('#from_date').val()).toEqual('1-Jan-2015');
      expect(view.$('#date_filter').find('#to_date').val()).toEqual('31-Jan-2015');
    });

    it("displays a table", function(){
      expect(view.el).toContainElement('table');
      expect(view.$('tbody tr').length).toEqual(1);
    });
    
    it('#updateDateRange', function(){
      var router = jasmine.createSpyObj('router', ['setCurrentDateRange']);
      window.router = router;
      view.$('#date_range_option_id').val(2);
      view.updateDateRange();
      expect(window.router.setCurrentDateRange).toHaveBeenCalledWith(dateRangeOptions.at(1));
    });

    describe('#reloadPage', function(){
      var router;
      beforeEach(function(){
        spyOn(view, 'updateDateRange');
        router = jasmine.createSpyObj('router', ['navigate', 'subcategoryReport']);
        window.router = router;
      });
      it('different subcategory', function(){
        view.$('#subcategory_id').val(5);
        view.reloadPage();
        expect(view.updateDateRange).toHaveBeenCalled();
        expect(window.router.navigate).toHaveBeenCalledWith('reports/subcategory/2/5', {trigger: true})
        expect(window.router.subcategoryReport).not.toHaveBeenCalled();
      });
      it('same subcategory', function(){
        view.reloadPage();
        expect(view.updateDateRange).toHaveBeenCalled();
        expect(window.router.navigate).toHaveBeenCalledWith('reports/subcategory/2/3', {trigger: true})
        expect(window.router.subcategoryReport).toHaveBeenCalledWith('2', '3');
      });
    });

    it('#draw', function(){
      spyOn(MyMoney.Views.BarChartView.prototype, 'initialize');
      view.draw();
      expect(MyMoney.Views.BarChartView.prototype.initialize).toHaveBeenCalledWith({model: monthTotals});
    });

    describe("events", function(){
      it("filter search", function(){
        spyOn(view, 'reloadPage');
        view.$('#search').click();
        expect(view.reloadPage).toHaveBeenCalled();
      });

      it("edit transactions", function(){
        spyOn(view, 'reloadPage');
        view.transactions.at(0).trigger('change');
        expect(view.reloadPage).toHaveBeenCalled();
      });

      it("delete transactions", function(){
        spyOn(view, 'reloadPage');
        view.transactions.at(0).trigger('destroy');
        expect(view.reloadPage).toHaveBeenCalled();
      });
    });
  });
});