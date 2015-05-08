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

    accounts = new MyMoney.Collections.Accounts([account]);
    categoryTypes = new MyMoney.Collections.CategoryTypesCollection([]);
    categories = new MyMoney.Collections.Categories([]);
    subcategories = new MyMoney.Collections.Subcategories([]);
    patterns = new MyMoney.Collections.Patterns([pattern]);

    view = new MyMoney.Views.PatternIndexView({
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
    expect(view.collection).not.toBeDefined();
  });

  describe('fetchData', function(){
    it('gets pattern data for account', function(){
      spyOn(MyMoney.Collections.Patterns.prototype, 'initialize').and.callThrough();
      spyOn(MyMoney.Collections.Patterns.prototype, 'fetch');

      view.fetchData();

      expect(MyMoney.Collections.Patterns.prototype.initialize).toHaveBeenCalledWith([], {account_id: 13})
      expect(MyMoney.Collections.Patterns.prototype.fetch).toHaveBeenCalled();
    });
  });

  describe("render", function(){
    beforeEach(function(){
      view.collection = patterns;
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
      view.collection = patterns;
      view.render();
      view.reloadPage();
      expect(window.location.hash).toEqual('#accounts/13/patterns')
    });

    xit("calls the reloadPage function", function(){
      spyOn(view, 'reloadPage');
      view.render();
      view.$('#account_id').val('13').change();
      expect(view.reloadPage).toHaveBeenCalled();
    });
  });
});