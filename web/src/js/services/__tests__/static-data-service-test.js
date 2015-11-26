import staticDataService from '../static-data-service';
import staticDataActions from '../../actions/static-data-actions';
import staticDataTransfomer from '../../transformers/static-data-transformer';

describe('StaticDataService', () => {
  beforeEach(function() {
    spyOn(staticDataService, '_send');
  });

  describe('getDateRanges', () => {
    it('makes an ajax request to GET/date_range_options', () => {
      staticDataService.getDateRanges();

      let requestParams = staticDataService._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/date_range_options');
      expect(requestParams.method).toEqual('GET');

      spyOn(staticDataActions, 'receiveDateRanges');
      spyOn(staticDataTransfomer, 'transformDateRange').and.returnValue('transformedDateRange');
      requestParams.success({date_range_options: ['dateRanges']});
      expect(staticDataActions.receiveDateRanges).toHaveBeenCalledWith(['transformedDateRange']);
    });
  });
});
