describe('Report', function(){
  var report;
  beforeEach(function(){
    report = new MyMoney.Models.Report({}, {reportName: 'report_name'});
  });

  it('has a URL', function(){
    expect(report.url()).toEqual('report/report_name');
  });

  describe('validation', function(){
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