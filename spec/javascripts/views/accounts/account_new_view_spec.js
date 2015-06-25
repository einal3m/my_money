describe("MyMoney.Views.AccountNewView", function(){
  var view, accounts, accountTypes;
  beforeEach(function(){
    accounts = new MyMoney.Collections.Accounts([]);
    accountTypes = new MyMoney.Collections.AccountTypes([
      {id: 1, code: 'savings', name: 'Savings'},
      {id: 2, code: 'share', name: 'Shares'},
      {id: 3, code: 'other', name: 'Account Type 3'}
    ]);

    view = new MyMoney.Views.AccountNewView({
      collection: accounts,
      accountTypes: accountTypes
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.collection).toEqual(accounts);
    expect(view.accountTypes).toEqual(accountTypes);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays the new account page", function(){
      expect(view.$('h1')).toContainText('new account');
    });

    it('creates a new account model', function(){
      expect(view.model).toEqual(jasmine.any(MyMoney.Models.Account));
      expect(view.model.isNew()).toBeTruthy();
    });

    it("creates an accountTypeSelectionView", function(){
      spyOn(MyMoney.Views.FilterView.prototype, 'initialize').and.callThrough();
      view.render();

      expect(MyMoney.Views.FilterView.prototype.initialize).toHaveBeenCalled();
      expect(MyMoney.Views.FilterView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
        model: view.filterModel,
        accountTypes: accountTypes
      });
      expect(view.el).toContainElement('select#account_type_id');
      expect(view.el).toContainElement('#filter');
    });

    it('creates empty form', function(){
      expect(view.el).toContainElement('#new_form');
      expect(view.$('#new_form')).toBeEmpty();
    });

    it('#addFormView', function(){
      spyOn(MyMoney.Views.AccountFormView.prototype, 'initialize').and.callThrough();
      view.filterModel.set({account_type: 'savings'});
      view.addFormView();

      expect(view.model.get('account_type')).toEqual('savings');
      expect(MyMoney.Views.AccountFormView.prototype.initialize).toHaveBeenCalled();
      expect(MyMoney.Views.AccountFormView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
        model: view.model,
        collection: view.collection
      });
    });

    describe('done', function(){
      beforeEach(function(){
        router = jasmine.createSpyObj('router', ['navigate']);
        window.router = router;
      });
      it('routes to index page when saved', function(){
        view.collection.trigger('add');
        expect(window.router.navigate).toHaveBeenCalledWith('accounts', {trigger: true});
      });

      it('routes to index page when canceled', function(){
        view.filterModel.set({account_type: 'savings'});
        view.addFormView();
        view.subViews['new_form'].trigger('cancelEdit');
        expect(window.router.navigate).toHaveBeenCalledWith('accounts', {trigger: true});
      });
    });

  });
});
