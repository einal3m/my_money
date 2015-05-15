describe("AccountTypeFilterView", function(){
  var view, accountTypes;
  beforeEach(function(){
    accountTypes = new MyMoney.Collections.AccountTypes([
      {id: 1, name: 'Account Type 1'},
      {id: 2, name: 'Account Type 2'},
      {id: 3, name: 'Account Type 3'}
    ]);
    filter = new MyMoney.Models.Filter();

    view = new MyMoney.Views.AccountTypeFilterView({
      model: filter,
      accountType: accountTypes.at(1),
      accountTypes: accountTypes
    })
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(filter);
    expect(view.accountType).toEqual(accountTypes.at(1));
    expect(view.accountTypes).toEqual(accountTypes);
  });

  describe('#templateData', function(){
    it('with account type', function(){
      expect(view.templateData()).toEqual({
        accountTypeId: 2,
        accountTypes: accountTypes
      });
    });
    it('without account type', function(){
      view.accountType = null;
      expect(view.templateData()).toEqual({
        accountTypeId: null,
        accountTypes: accountTypes
      });
    });
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays an account type dropdown", function(){
      expect(view.el).toContainElement('select#account_type_id');
      expect(view.$('#account_type_id').val()).toEqual('2');
    });

    it('select account type updates model', function(){
      view.$('#account_type_id').val('3').change();
      expect(view.model.get('account_type_id')).toEqual(3);
    });
  });

});
