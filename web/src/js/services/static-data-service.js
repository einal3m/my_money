import staticDataActions from '../actions/static-data-actions';
import staticDataTransformer from '../transformers/static-data-transformer';
import reqwest from 'reqwest';

class StaticDataService {
  getDateRanges() {
    this._send({
        url: 'http://localhost:3000/date_range_options',
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'GET',
        success: function (response) {
          staticDataActions.receiveDateRanges(
            response.date_range_options.map((dateRange) => {
              return staticDataTransformer.transformDateRange(dateRange)
            })
          )
        }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new StaticDataService();
