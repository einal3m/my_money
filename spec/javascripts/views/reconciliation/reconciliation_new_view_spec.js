describe("ReconciliationNewView", function(){
  var view, reconciliation, account;
  beforeEach(function(){
    account = new MyMoney.Models.Account({
      id: 13,
      name: 'My Account'
    });

    reconciliation = new MyMoney.Models.Reconciliation({
      id: 20,
      account_id: 13,
      statement_balance: 100,
      statement_date: '01-Jul-2014'
    });

    view = new MyMoney.Views.ReconciliationNewView({
      model: reconciliation,
      account: account
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.account).toEqual(account);
    expect(view.model).toEqual(reconciliation);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays the new reconciliation form", function(){
      expect(view.el).toContainElement('.form-horizontal');
      expect(view.$('h4')).toContainText('Step 1 of 2');
      expect(view.$('h4')).toContainText('Enter Statement Details');
    });

    it("displays the account name", function(){
      expect(view.$('.form-group')[0]).toContainText('My Account');
    });

    it("displays input fields for statement date and balance", function(){
      expect(view.$('#statement_date')).toHaveValue('1-Jul-2014');
      expect(view.$('#statement_balance')).toHaveValue('1.00');
    });

    it("displays reconcile and cancel buttons", function(){
      expect(view.$('.form-footer')).toContainElement('button#reconcile');
      expect(view.$('.form-footer')).toContainElement('button#cancel');
    });

    describe("cancel", function(){
      it("goes back to previous page", function(){
        spyOn(Backbone.history.history, 'back');
        view.$('button#cancel').click();
        expect(Backbone.history.history.back).toHaveBeenCalled();
      });
    });

    describe("reconcile", function(){
      it("updates and saves the reconciliation if valid", function(){
        spyOn(view.model, 'isValid').and.returnValue(true);
        spyOn(view.model, 'save');
        spyOn(view, 'trigger');

        view.$('#statement_date').val('4-Jul-2014');
        view.$('#statement_balance').val('40855.13');
        view.$('button#reconcile').click();

        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.get('statement_date')).toEqual('2014-07-04');
        expect(view.model.get('statement_balance')).toEqual(4085513);
        expect(view.model.save).toHaveBeenCalled();
        expect(view.trigger).toHaveBeenCalledWith('startReconcile');
      })

      it("doesn't save the reconciliation if not valid", function(){
        spyOn(view.model, 'isValid').and.returnValue(false);
        spyOn(view.model, 'save');
        spyOn(view, 'trigger');

        view.$('button#reconcile').click();

        expect(view.model.isValid).toHaveBeenCalled();
        expect(view.model.save).not.toHaveBeenCalled();
        expect(view.trigger).not.toHaveBeenCalled();
      })
    });
  });
});