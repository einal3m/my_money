describe('ReportForAccount', function(){
  var report;
  beforeEach(function(){
    report = new MyMoney.Models.ReportForAccount({account_id: 7}, {reportName: 'report_for_account'});
  });

  it('has a URL', function(){
    expect(report.url()).toEqual('report/report_for_account?account_id=7');
  });

  describe('validation', function(){
    it ('requires account', function(){
      expect(report.preValidate('account_id', null)).toEqual('Account is required');
      expect(report.preValidate('account_id', 10)).toEqual('');
    });

    it ('requires a from date', function(){
      expect(report.preValidate('from_date', '   ')).toEqual('From date is required');
      expect(report.preValidate('from_date', '01-Jul-2015')).toEqual('');
    });

    it ('requires a to date', function(){
      expect(report.preValidate('to_date', '   ')).toEqual('To date is required');
      expect(report.preValidate('to_date', '01-Jul-2015')).toEqual('');
    });
  });
});