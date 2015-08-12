describe("MyMoney.Views.BankStatementRowView", function(){
  var view, account, bankStatement;
  beforeEach(function(){
    account = new MyMoney.Models.Account({id: 13, account_type: 'savings'});
    bankStatement = new MyMoney.Models.BankStatement(
      {id: 1, file_name: 'file.ofx', transaction_count: 44, date: '2015-07-12'}
    );

    view = new MyMoney.Views.BankStatementRowView({
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

    it("displays a table row with bank statement details", function(){
      expect(view.el).toEqual('tr');

      var columns = view.$('td');
      expect(columns.length).toEqual(3);
      expect(columns[0]).toContainText('12-Jul-2015');
      expect(columns[1]).toContainText('file.ofx');
      expect(columns[2]).toContainText('44');
    });

    it("row is clickable", function(){
      expect(view.el).toHaveClass('clickable');
    });

    it("when clicked displays an edit view and is no longer clickable", function(){
      expect(view.editView).not.toBeDefined();
      view.$el.click();
      expect(view.editView).toBeDefined();
      expect(view.editView.model).toEqual(bankStatement);
      expect(view.editView.account).toEqual(account);
      expect(view.el).not.toHaveClass('clickable');
    });
  });

  describe('after edit event', function(){
    it("sets class to clickable", function(){
      expect(view.el).toHaveClass('clickable');
      expect(view.el).not.toHaveClass('editing');
      view.$el.click();
      expect(view.el).not.toHaveClass('clickable');
      expect(view.el).toHaveClass('editing');
      view.$('button#cancel').click();
      expect(view.el).toHaveClass('clickable');
      expect(view.el).not.toHaveClass('editing');
    });
  });
});
