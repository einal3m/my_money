import dateRangeActions from '../actions/date-range-actions';
import dateRangeTransformer from '../transformers/date-range-transformer';
import reqwest from 'reqwest';

class DateRangeApi {
  index(successCallback) {
    this._send({
        url: 'http://localhost:3000/date_range_options',
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'GET',
        success: function (response) {
          dateRangeActions.storeDateRanges(
            response.date_range_options.map((dateRange) => {
              return dateRangeTransformer.transformDateRange(dateRange)
            })
          );
          if (successCallback) {
            successCallback();
          }
        }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new DateRangeApi();
