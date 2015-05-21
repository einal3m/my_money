describe("AccountRowView", function(){
  var view, account;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      account_type_id: 1,
      name: 'My Account',
      bank: 'My Bank',
      ticker: 'TCK',
      starting_date: '12-May-2014',
      current_balance: 1000
    });

    view = new MyMoney.Views.AccountRowView({
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

    describe('savings', function(){
      it("displays a table row with account data", function(){
        expect(view.el).toEqual('tr');
        expect(view.template).toEqual('accounts/savings_row');

        var columns = view.$('td');
        expect(columns.length).toEqual(4);
        expect(columns[0]).toContainText('My Account');
        expect(columns[1]).toContainText('My Bank');
        expect(columns[2]).toContainText('$10.00');
      });
    });

    describe('share', function(){
      it("displays a table row with account data", function(){
        view.model.set({account_type_id: 2});
        view.render();
        expect(view.el).toEqual('tr');
        expect(view.template).toEqual('accounts/shares_row');

        var columns = view.$('td');
        expect(columns.length).toEqual(3);
        expect(columns[0]).toContainText('TCK - My Account');
        expect(columns[1]).toContainText('$10.00');
      });
    });

    it("row is clickable", function(){
      expect(view.el).toHaveClass('clickable');
    });

    it("when clicked routes to account transactions", function(){
      router = jasmine.createSpyObj('router', ['navigate']);
      window.router = router;
      view.$el.click();
      expect(window.router.navigate).toHaveBeenCalledWith('accounts/13/transactions', {trigger: true});
    });
  });
});
