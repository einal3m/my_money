import dateRangeApi from '../apis/date-range-api';
import store from '../stores/store';

class DateRangeActions {
  fetchDateRanges(callBack) {
    dateRangeApi.index(callBack);
  }

  storeDateRanges(dateRanges) {
    store.dispatch({
      type: 'SET_DATE_RANGES',
      dateRanges: dateRanges
    });
  }

  setCurrentDateRange(id) {
    store.dispatch({
      type: 'SET_CURRENT_DATE_RANGE',
      id: id
    });
  }

  updateCurrentDateRange(data) {
    store.dispatch({
      type: 'UPDATE_CURRENT_DATE_RANGE',
      dateChange: data
    });
  }
}

export default new DateRangeActions();
