describe("MyMoney.Views.BankStatementEditView", function(){
  var view, account, bankStatement;
  beforeEach(function(){
    account = new MyMoney.Models.Account({id: 13, account_type: 'savings'});
    bankStatement = new MyMoney.Models.BankStatement(
      {id: 1, file_name: 'file.ofx', transaction_count: 44, date: '2015-07-12'}
    );

    view = new MyMoney.Views.BankStatementEditView({
      account: account,
      model: bankStatement
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.account).toEqual(account);
    expect(view.model).toEqual(bankStatement);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a delete button", function(){
      expect(view.el).toContainElement('button#delete');
    });

    it("displays a delete message", function(){
      expect(view.el).toContainText('This will delete all transactions');
    });
  });
});

