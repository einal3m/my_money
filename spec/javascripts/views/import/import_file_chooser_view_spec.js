describe("MyMoney.Views.ImportFileChooserView", function(){
  var view, account, bankStatement, bankStatements, transactions;
  beforeEach(function(){
    account = new MyMoney.Models.Account({id: 15, name: 'My Account'});
    bankStatement = new MyMoney.Models.BankStatement({account_id: account.id});
    bankStatements = new MyMoney.Collections.BankStatements([], {account_id: account.id});
    transactions = new MyMoney.Collections.Transactions([], {account_id: account.id});

    view = new MyMoney.Views.ImportFileChooserView({
      account: account,
      model: bankStatement,
      bankStatements: bankStatements,
      collection: transactions
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.account).toEqual(account);
    expect(view.model).toEqual(bankStatement);
    expect(view.collection).toEqual(transactions);
    expect(view.bankStatements).toEqual(bankStatements);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays step 1 of the import view", function(){
      expect(view.el).toContainText('Step 1 of 2');
    });

    it('displays a list of bank statements', function(){
      expect(view.el).toContainText('import history');
    });

    it("displays the account name", function(){
      expect(view.el).toContainText('My Account');
    });

    it("displays a hidden file chooser input", function(){
      expect(view.el).toContainElement('input#file_name');
      expect(view.$('#file_name')).toHaveClass('hidden');
    });

    it("displays a file chooser button", function(){
      expect(view.el).toContainElement('button#open_file');
    });

    describe('click on upload', function(){
      it('displays error if no file chosen', function(){
        view.$('#uploadOFX').click();
        expect(view.el).toContainText('Please provide a file name')
      });

      it('calls upload on the transaction collection', function(){
        spyOn(view.collection, 'uploadOFX');
        spyOn(view, 'formData').and.returnValue('data');
        view.model.set('file_name', 'file.ofx');
        view.uploadOFX();
        expect(view.collection.uploadOFX).toHaveBeenCalledWith('data', view.success);
      });

      it('sets collection on success', function(){
        data = {transactions: [{id: 7, account_id: 15, date: '2014-12-18', amount: 500}]};
        view.success(data);
        expect(view.collection.length).toEqual(1);
        expect(view.collection.at(0).id).toEqual(7);
      });
    });

    describe('click on cancel', function(){
      it('navigates to transaction page', function(){
        spyOn(view, 'navigateToTransactions');
        view.$('#cancel').click();
        expect(view.navigateToTransactions).toHaveBeenCalled();
      });
    });
  });
});
