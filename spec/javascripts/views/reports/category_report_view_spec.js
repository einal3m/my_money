describe("CategoryReportView", function(){
  var view, account, accounts, category, categories, subcategories, categoryTypes, transactions;
  beforeEach(function(){
    categoryType = new MyMoney.Models.CategoryType({id: 1, name: 'CategoryType 1'});
    categoryTypes = new MyMoney.Collections.CategoryTypes([categoryType]);
    categories = new MyMoney.Collections.Categories([
      {id: 2, name: 'Category 1', category_type_id: 1},
      {id: 4, name: 'Category 2', category_type_id: 1}
    ]);
    category = categories.at(0);
    subcategories = new MyMoney.Collections.Subcategories([]);
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
      category_id: null,
      subcategory_id: null,
      balance: 4000,
      reconciliation_id: 4
    });
    transactions = new MyMoney.Collections.Transactions([transaction]);

    view = new MyMoney.Views.CategoryReportView({
      category: category,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories,
      dateRangeOptions: dateRangeOptions,
      currentDateRange: currentDateRange
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.category).toEqual(category);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
    expect(view.dateRangeOptions).toEqual(dateRangeOptions);
    expect(view.currentDateRange).toEqual(currentDateRange);

    expect(view.collection).not.toBeDefined();
    expect(view.model).not.toBeDefined();
  });

  describe('fetchData with category', function(){
    it('gets transaction data for account', function(){
      spyOn(MyMoney.Models.Report.prototype, 'fetch');

      view.fetchData();

      expect(view.model).toEqual(jasmine.any(MyMoney.Models.Report));
      expect(view.model.get('category_id')).toEqual(2);
      expect(MyMoney.Models.Report.prototype.fetch).toHaveBeenCalled();
    });
  });  

  describe('fetchData without category', function(){
    it('gets transaction data for account', function(){
      view.category = null;
      spyOn(MyMoney.Models.Report.prototype, 'fetch');

      view.fetchData();

      expect(view.model).toEqual(jasmine.any(MyMoney.Models.Report));
      expect(view.model.get('category_id')).toEqual(null);
      expect(MyMoney.Models.Report.prototype.fetch).toHaveBeenCalled();
    });
  });

  describe('render', function(){
    beforeEach(function(){
      view.model = new MyMoney.Models.Report({category_id: 2, transactions: transactions, month_totals: monthTotals});
      view.render();
    });

    it("displays the category report page", function(){
      expect(view.$('h1')).toContainText('category report');
    });

    it("displays a category filter", function(){
      expect(view.el).toContainElement('#category_filter');
      expect(view.$('#category_filter').find('#category_id').val()).toEqual(category.id.toString());
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
      router = jasmine.createSpyObj('router', ['setCurrentDateRange']);
      window.router = router;
      view.$('#date_range_option_id').val(2);
      view.updateDateRange();
      expect(window.router.setCurrentDateRange).toHaveBeenCalledWith(dateRangeOptions.at(1));
    });

    describe('#reloadPage', function(){
      beforeEach(function(){
        spyOn(view, 'updateDateRange');
        router = jasmine.createSpyObj('router', ['navigate', 'reportCategory']);
        window.router = router;
      });
      it('different category', function(){
        view.$('#category_id').val(4);
        view.reloadPage();
        expect(view.updateDateRange).toHaveBeenCalled();
        expect(window.router.navigate).toHaveBeenCalledWith('reports/category/4', {trigger: true})
        expect(window.router.reportCategory).not.toHaveBeenCalled();
      });
      it('same category', function(){
        view.reloadPage();
        expect(view.updateDateRange).toHaveBeenCalled();
        expect(window.router.navigate).toHaveBeenCalledWith('reports/category/2', {trigger: true})
        expect(window.router.reportCategory).toHaveBeenCalledWith('2');
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