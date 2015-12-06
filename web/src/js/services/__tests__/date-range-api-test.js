import dateRangeApi from '../date-range-api';
import dateRangeActions from '../../actions/date-range-actions';
import dateRangeTransfomer from '../../transformers/date-range-transformer';

describe('DateRangeApi', () => {
  beforeEach(function() {
    spyOn(dateRangeApi, '_send');
  });

  describe('index', () => {
    it('makes an ajax request to GET/date_range_options', () => {
      dateRangeApi.index();

      let requestParams = dateRangeApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/date_range_options');
      expect(requestParams.method).toEqual('GET');

      spyOn(dateRangeActions, 'storeDateRanges');
      spyOn(dateRangeTransfomer, 'transformDateRange').and.returnValue('transformedDateRange');
      requestParams.success({date_range_options: ['dateRanges']});
      expect(dateRangeActions.storeDateRanges).toHaveBeenCalledWith(['transformedDateRange']);
    });
  });
});
