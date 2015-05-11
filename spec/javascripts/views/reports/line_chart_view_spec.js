describe('LineChartView', function(){
  var view, reportData, selector;
  beforeEach(function(){
    reportData = 'something';
    selector = '#line_chart'
    view = new MyMoney.Views.LineChartView({
      model: new Backbone.Model({report: reportData})
    });
  });

  it('calls pie_chart function', function(){
    spyOn(window, 'line_chart');
    view.render();
    expect(window.line_chart).toHaveBeenCalledWith(reportData, selector);
  });
});