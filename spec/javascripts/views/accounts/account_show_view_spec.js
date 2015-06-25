describe("MyMoney.Views.AccountShowView", function(){
  var view, account;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      account_type: 'savings',
      name: 'My Account',
      bank: 'My Bank',
      ticker: 'TCK',
      starting_date: '12-May-2014',
      starting_balance: 100
    });

    view = new MyMoney.Views.AccountShowView({
      model: account
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(account);
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
        view.model.set({account_type: 'share'});
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
