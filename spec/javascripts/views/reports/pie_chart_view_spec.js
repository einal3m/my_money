describe('PieChartView', function(){
  var view, selector, sums, labels;
  beforeEach(function(){
    selector = '#report_id';
    sums = [20, 30];
    labels = ['something', 'another'];

    view = new MyMoney.Views.PieChartView({
      report_id: selector,
      sums: sums,
      labels: labels
    });
  });

  it('initialize', function(){
    expect(view.selector).toEqual('#report_id');
    expect(view.sums).toEqual(sums);
    expect(view.labels).toEqual(labels);
  });

  it('calls pie_chart function', function(){
    spyOn(window, 'pie_chart');
    view.render();
    expect(window.pie_chart).toHaveBeenCalledWith(sums, labels, selector);
  });
});