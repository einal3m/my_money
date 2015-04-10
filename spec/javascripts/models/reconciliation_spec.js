describe('Reconciliation', function(){
  var reconciliation;
  beforeEach(function(){
    reconciliation = new MyMoney.Models.Reconciliation({id: 10, account_id: 13});
  });

  it('has a URL', function(){
    expect(reconciliation.url()).toEqual('accounts/13/reconciliations/10');
  });

  describe('validation', function(){
    it ('requires a statement date', function(){
      expect(reconciliation.preValidate('statement_date', '   ')).toEqual('Statement date is required');
      expect(reconciliation.preValidate('statement_date', '01-Jul-2014')).toEqual('');
    });

    it ('requires a statement balance', function(){
      expect(reconciliation.preValidate('statement_balance', '   ')).toEqual('Statement balance is required');
      expect(reconciliation.preValidate('statement_balance', 300)).toEqual('');
    });
  });
});