import apiUtil from '../util/api-util';
import dateRangeTransformer from '../transformers/date-range-transformer';
import store from '../stores/store';

class DateRangeActions {
  getDateRanges() {
    const dateRangesLoaded = store.getState().dateRangeStore.get('loaded');

    if (!dateRangesLoaded) {
      store.dispatch({ type: 'GET_DATE_RANGES' });
      return apiUtil.get({
        url: 'date_range_options',
        onSuccess: response => this.storeDateRanges(
          response.date_range_options.map(dateRange => dateRangeTransformer.transformDateRange(dateRange))
        ),
      });
    } else {
      return Promise.resolve();
    }
  }

  storeDateRanges(dateRanges) {
    store.dispatch({ type: 'SET_DATE_RANGES', dateRanges });
  }

  setCurrentDateRange(id) {
    store.dispatch({ type: 'SET_CURRENT_DATE_RANGE', id });
  }

  updateCurrentDateRange(data) {
    store.dispatch({ type: 'UPDATE_CURRENT_DATE_RANGE', dateChange: data });
  }
}

export default new DateRangeActions();
