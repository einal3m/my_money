describe("PatternIndexView", function(){
  var view, account, accounts, categories, subcategories, categoryTypes, pattern, patterns;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      name: 'My Account'
    });
    pattern = new MyMoney.Models.Pattern({
      id: 12,
      match_text: 'My match text',
      notes: 'My Notes'
    });

    accounts = new MyMoney.Collections.AccountsCollection([account]);
    categoryTypes = new MyMoney.Collections.CategoryTypesCollection([]);
    categories = new MyMoney.Collections.CategoriesCollection([]);
    subcategories = new MyMoney.Collections.SubcategoriesCollection([]);
    patterns = new MyMoney.Collections.Patterns([pattern]);

    view = new MyMoney.Views.PatternIndexView({
      collection: patterns,
      account: account,
      accounts: accounts,
      categoryTypes: categoryTypes,
      categories: categories,
      subcategories: subcategories
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.account).toEqual(account);
    expect(view.accounts).toEqual(accounts);
    expect(view.categories).toEqual(categories);
    expect(view.subcategories).toEqual(subcategories);
    expect(view.categoryTypes).toEqual(categoryTypes);
    expect(view.collection).toEqual(patterns);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays the pattern index page", function(){
      expect(view.$('h1')).toContainText('my patterns');
    });

    it("displays an account filter", function(){
      expect(view.el).toContainElement('#account_filter');
      expect(view.$('#account_filter').find('#account_id').val()).toEqual(account.id.toString());
    });

    it("displays a table", function(){
      expect(view.el).toContainElement('table.patterns');
      expect(view.$('table.patterns tbody tr').length).toEqual(1);
    });
  });

  describe("change account", function(){
    it("reloadPage", function(){
      router = jasmine.createSpyObj('router', ['navigate', 'patternIndexForAccount']);
      window.router = router;
      view.render();
      view.reloadPage();
      expect(window.router.navigate).toHaveBeenCalledWith('accounts/13/patterns', {trigger: true});
      expect(window.router.patternIndexForAccount).toHaveBeenCalledWith('13');
    });

    xit("calls the reloadPage function", function(){
      spyOn(view, 'reloadPage');
      view.render();
      view.$('#account_id').val('13').change();
      expect(view.reloadPage).toHaveBeenCalled();
    });
  });
});