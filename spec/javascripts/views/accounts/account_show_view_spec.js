describe("AccountShowView", function(){
  var view, account, accountType;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      account_type_id: 1,
      name: 'My Account',
      bank: 'My Bank',
      ticker: 'TCK',
      starting_date: '12-May-2014',
      starting_balance: 100
    });
    accountType = new MyMoney.Models.AccountType({id: 1, name: 'Savings'});

    view = new MyMoney.Views.AccountShowView({
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

    describe('for savings', function(){
      it("displays account details", function(){
        expect(view.template).toEqual('accounts/savings_show');
        expect(view.el).toContainText('My Account');
        expect(view.el).toContainText('My Bank');
        expect(view.el).toContainText('12-May-2014');
        expect(view.el).toContainText('$1');
      });
    });

    describe('for savings', function(){
      it("displays account details", function(){
        view.model.set({account_type_id: 2});
        view.render();
        expect(view.template).toEqual('accounts/shares_show')
        expect(view.el).toContainText('My Account');
        expect(view.el).toContainText('TCK');
      });
    });

    it("has an edit button", function(){
      expect(view.el).toContainElement('button#edit');
    });

    it('edit clicked triggers "edit"', function(){
      spyOn(view, 'trigger');
      view.$('#edit').click();
      expect(view.trigger).toHaveBeenCalledWith('edit');
    });
  });
});
