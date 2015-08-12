describe("MyMoney.Views.BankStatementsTableView", function(){
  var view, account, bank_statements;
  beforeEach(function(){
    account = new MyMoney.Models.Account({id: 2, account_type: 'savings', name: 'My Account'});
    bank_statements = new MyMoney.Collections.BankStatements([
      {id: 1, file_name: 'file.ofx'},
      {id: 2, file_name: 'blah.ofx'}
    ], {account_id: account.id});

    view = new MyMoney.Views.BankStatementsTableView({
      account: account,
      collection: bank_statements
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.account).toEqual(account);
    expect(view.collection).toEqual(bank_statements);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a panel with table", function(){
      expect(view.el).toContainElement('.panel');
      expect(view.$('.panel-heading')).toContainText('import history');
      expect(view.$('.panel')).toContainElement('table');
    });

    it ('has rows', function(){
      expect(view.$('tbody tr').length).toEqual(2)
    });
  });
});
