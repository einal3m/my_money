describe("MyMoney.Views.AccountFormView", function(){
  var view, account, accounts;
  beforeEach(function(){
    account = new MyMoney.Models.Account({account_type: 'savings'});
    accounts = new MyMoney.Collections.Accounts([]);

    view = new MyMoney.Views.AccountFormView({
      model: account,
      collection: accounts
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(account);
    expect(view.collection).toEqual(accounts);
  });

  describe('#setTemplate', function(){
    it("for savings", function(){
      view.model.set({account_type: 'savings'});
      view.setTemplate();
      expect(view.template).toEqual('accounts/savings_form');
    });
    it("for shares", function(){
      view.model.set({account_type: 'share'});
      view.setTemplate();
      expect(view.template).toEqual('accounts/shares_form');
    });
  });

  describe('for shares', function(){
    beforeEach(function(){
      view.model.set({account_type: 'share'});
      view.setTemplate();
      view.render();
    });
    it("#render", function(){
      expect(view.el).toContainElement('.form-horizontal');
      expect(view.el).toContainElement('input#name');
      expect(view.el).toContainElement('input#ticker');
      expect(view.el).toContainElement('button#cancel');
      expect(view.el).toContainElement('button#save');
    });
    it('#setModelAttributes', function(){
      view.$('#ticker').val('MEL');
      view.$('#name').val('My Share Name');
      view.setModelAttributes();
      expect(view.model.get('ticker')).toEqual('MEL');
      expect(view.model.get('name')).toEqual('My Share Name');
    });
  });

  describe("for savings", function(){
    beforeEach(function(){
      view.model.set({account_type: 'savings'});
      view.setTemplate();
      view.render();
    });
    it("#render", function(){
      expect(view.el).toContainElement('.form-horizontal');
      expect(view.el).toContainElement('input#name');
      expect(view.el).toContainElement('input#bank');
      expect(view.el).toContainElement('input#starting_date');
      expect(view.el).toContainElement('input#starting_balance');
      expect(view.el).toContainElement('button#cancel');
      expect(view.el).toContainElement('button#save');
    });
    it('#setModelAttributes', function(){
      view.$('#name').val('My Account Name');
      view.$('#bank').val('My Bank');
      view.$('#starting_date').val('1-Jan-2015');
      view.$('#starting_balance').val('50.00');
      view.setModelAttributes();
      expect(view.model.get('name')).toEqual('My Account Name');
      expect(view.model.get('bank')).toEqual('My Bank');
      expect(view.model.get('starting_date')).toEqual('2015-01-01');
      expect(view.model.get('starting_balance')).toEqual(5000);
    });
  });

});
