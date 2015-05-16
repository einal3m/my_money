describe("AccountShowView", function(){
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

    it("displays account details", function(){
      expect(view.el).toContainText('My Account');
      expect(view.el).toContainText('My Bank');
      expect(view.el).toContainText('12-May-2014');
      expect(view.el).toContainText('$1');
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
