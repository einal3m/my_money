describe('DateRangeOption', function(){
  var dateRangeOption;
  beforeEach(function(){
    dateRangeOption = new MyMoney.Models.DateRangeOption({id: 10});
  });

  it('has a URL', function(){
    expect(dateRangeOption.url()).toEqual('date_range_options/10');
  });
});