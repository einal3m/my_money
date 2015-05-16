describe("AccountSummaryView", function(){
  var view, account, accountType;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      name: 'My Account',
      bank: 'My Bank',
      starting_date: '12-May-2014',
      starting_balance: 100
    });
    accountType = new MyMoney.Models.AccountType({id: 1, name: 'Savings'});

    view = new MyMoney.Views.AccountSummaryView({
      model: account,
      accountType: accountType
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(account);
    expect(view.accountType).toEqual(accountType);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays the account summary page", function(){
      expect(view.$('h1')).toContainText('account summary');
    });

    it("has a reconcile button", function(){
      expect(view.el).toContainElement('button#reconcile');
    });

    it("creates an accountShowView", function(){
      spyOn(MyMoney.Views.AccountShowView.prototype, 'initialize').and.callThrough();
      view.render();

      expect(view.el).toContainElement('#account');
      expect(MyMoney.Views.AccountShowView.prototype.initialize).toHaveBeenCalled();
      expect(MyMoney.Views.AccountShowView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
        model: view.model,
        accountType: accountType
      });
    });

    describe('events', function(){
      it('reconcile button', function(){
        router = jasmine.createSpyObj('router', ['navigate']);
        window.router = router;
        view.$('#reconcile').click();
        expect(window.router.navigate).toHaveBeenCalledWith('accounts/13/reconciliation', {trigger: true});
      });
      it('edit', function(){
        spyOn(MyMoney.Views.AccountFormView.prototype, 'initialize').and.callThrough();
        view.subViews.account.trigger('edit');
        expect(MyMoney.Views.AccountFormView.prototype.initialize).toHaveBeenCalled();
        expect(MyMoney.Views.AccountFormView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
          model: view.model,
          accountType: accountType
        });
      });
      it('save', function(){
        view.$('#edit').click();
        spyOn(MyMoney.Views.AccountShowView.prototype, 'initialize').and.callThrough();
        view.model.trigger('sync');
        expect(MyMoney.Views.AccountShowView.prototype.initialize).toHaveBeenCalled();
        expect(MyMoney.Views.AccountShowView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
          model: view.model,
          accountType: accountType
        });
      });
      it('cancel', function(){
        view.$('#edit').click();
        spyOn(MyMoney.Views.AccountShowView.prototype, 'initialize').and.callThrough();
        view.subViews.account.trigger('cancel');
        expect(MyMoney.Views.AccountShowView.prototype.initialize).toHaveBeenCalled();
        expect(MyMoney.Views.AccountShowView.prototype.initialize.calls.argsFor(0)[0]).toEqual({
          model: view.model,
          accountType: accountType
        });
      });
    });
  });
});
