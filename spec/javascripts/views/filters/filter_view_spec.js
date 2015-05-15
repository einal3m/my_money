describe("FilterView", function(){
  var view;
  afterEach(function(){
    view.remove();
  });

  it("#render", function(){
    view = new MyMoney.Views.FilterView();
    spyOn(view, 'renderSubViews');
    spyOn(view, 'addAccountTypeFilter');
    spyOn(view, 'addAccountFilter');
    spyOn(view, 'addCategoryFilter');
    spyOn(view, 'addDateFilter');

    view.render();

    expect(view.addAccountTypeFilter).toHaveBeenCalled();
    expect(view.addAccountFilter).toHaveBeenCalled();
    expect(view.addCategoryFilter).toHaveBeenCalled();
    expect(view.addDateFilter).toHaveBeenCalled();
    expect(view.renderSubViews).toHaveBeenCalled();    
  });

  describe("#addDateFilter", function(){
    beforeEach(function(){
      view = new MyMoney.Views.FilterView();
      spyOn(MyMoney.Views.DateRangeFilterView.prototype, 'initialize');
    });

    it('with account types', function(){
      view.options.date_range = 'date_range';
      view.options.date_range_options = 'date_range_options';
      view.model = filter;
      view.addDateFilter();
      expect(MyMoney.Views.DateRangeFilterView.prototype.initialize).toHaveBeenCalledWith({
        model: 'date_range',
        collection: 'date_range_options'
      });
    });
    it('without account types', function(){
      view.addDateFilter();
      expect(MyMoney.Views.DateRangeFilterView.prototype.initialize).not.toHaveBeenCalled();
    });
  });

  describe("#addAccountTypeFilter", function(){
    beforeEach(function(){
      view = new MyMoney.Views.FilterView();
      spyOn(MyMoney.Views.AccountTypeFilterView.prototype, 'initialize');
    });

    it('with account types', function(){
      view.options.accountType = 'accountType';
      view.options.accountTypes = 'accountTypes';
      view.model = filter;
      view.addAccountTypeFilter();
      expect(MyMoney.Views.AccountTypeFilterView.prototype.initialize).toHaveBeenCalledWith({
        model: filter,
        accountType: 'accountType',
        accountTypes: 'accountTypes'
      });
    });
    it('without account types', function(){
      view.addAccountTypeFilter();
      expect(MyMoney.Views.AccountTypeFilterView.prototype.initialize).not.toHaveBeenCalled();
    });
  });

  describe("#addAccountFilter", function(){
    beforeEach(function(){
      view = new MyMoney.Views.FilterView();
      spyOn(MyMoney.Views.AccountFilterView.prototype, 'initialize');
    });

    it('with account types', function(){
      view.options.account = 'account';
      view.options.accounts = 'accounts';
      view.addAccountFilter();
      expect(MyMoney.Views.AccountFilterView.prototype.initialize).toHaveBeenCalledWith({
        model: 'account',
        collection: 'accounts'
      });
    });
    it('without account types', function(){
      view.addAccountFilter();
      expect(MyMoney.Views.AccountFilterView.prototype.initialize).not.toHaveBeenCalled();
    });
  });

  describe("#addCategoryFilter", function(){
    beforeEach(function(){
      view = new MyMoney.Views.FilterView();
      spyOn(MyMoney.Views.CategoryFilterView.prototype, 'initialize');
    });

    it('with account types', function(){
      view.options.category_id = 'category_id';
      view.options.categories = 'categories';
      view.options.subcategory_id = 'subcategory_id';
      view.options.subcategories = 'subcategories';
      view.options.categoryTypes = 'categoryTypes';
      view.addCategoryFilter();
      expect(MyMoney.Views.CategoryFilterView.prototype.initialize).toHaveBeenCalledWith({
        category_id: 'category_id',
        categories: 'categories',
        subcategory_id: 'subcategory_id',
        subcategories: 'subcategories',
        categoryTypes: 'categoryTypes'
      });
    });
    it('without account types', function(){
      view.addCategoryFilter();
      expect(MyMoney.Views.CategoryFilterView.prototype.initialize).not.toHaveBeenCalled();
    });
  });

});
