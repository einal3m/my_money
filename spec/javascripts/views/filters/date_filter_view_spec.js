describe("MyMoney.Views.DateRangeFilterView", function(){
  var view, dateRange1, dateRange2, dateRangeOptions;
  beforeEach(function(){
    dateRange1 = new MyMoney.Models.DateRangeOption({
      id: 1,
      name: 'Test Date Range',
      custom: false,
      from_date: '2015-01-01',
      to_date: '2015-01-31'
    });
    dateRange2 = new MyMoney.Models.DateRangeOption({
      id: 2,
      name: 'Custom Date Range',
      custom: true,
      from_date: '2015-02-01',
      to_date: '2015-02-28'
    });
    dateRangeOptions = new MyMoney.Collections.DateRangeOptions([dateRange1, dateRange2]);

    view = new MyMoney.Views.DateRangeFilterView({
      model: dateRange1,
      collection: dateRangeOptions
    });
  });

  afterEach(function(){
    view.remove();
  });

  it("initializes data", function(){
    expect(view.model).toEqual(dateRange1);
    expect(view.collection).toEqual(dateRangeOptions);
  });

  describe("render", function(){
    beforeEach(function(){
      view.render();
    });

    it("displays a date range option dropdown", function(){
      expect(view.el).toContainElement('select#date_range_option_id');
      expect(view.$('#date_range_option_id').val()).toEqual('1');
      expect(view.$('#from_date').val()).toEqual('1-Jan-2015');
      expect(view.$('#to_date').val()).toEqual('31-Jan-2015');
    });

    it('to and from dates are disabled', function(){
      expect(view.$('#from_date').prop('disabled')).toBeTruthy();
      expect(view.$('#to_date').prop('disabled')).toBeTruthy();
    });

    it('select account type updates model', function(){
      view.$('#date_range_option_id').val('2').change();
      expect(view.model).toEqual(dateRange2);
    });

    describe('select custom date range', function(){
      beforeEach(function(){
        view.$('#date_range_option_id').val('2').change();
      });

      it('selecting custom date range enables from and to input fields', function(){
        expect(view.$('#from_date').prop('disabled')).toBeFalsy();
        expect(view.$('#to_date').prop('disabled')).toBeFalsy();
      });

      it('update from_date updates model', function(){
        view.$('#from_date').val('19-Dec-2014').change();
        expect(view.model.get('from_date')).toEqual('2014-12-19');
      });

      it('update to_date updates model', function(){
        view.$('#to_date').val('21-Dec-2014').change();
        expect(view.model.get('to_date')).toEqual('2014-12-21');
      });
    });
  });

});
