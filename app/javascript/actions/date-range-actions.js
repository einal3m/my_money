import apiUtil from '../util/api-util';
import dateRangeTransformer from '../transformers/date-range-transformer';
import store from '../stores/store';

export const GET_DATE_RANGES = 'GET_DATE_RANGES';
export function getDateRanges() {
  const dateRangesLoaded = store.getState().dateRangeStore.get('loaded');

  if (!dateRangesLoaded) {
    store.dispatch({ type: GET_DATE_RANGES });
    return apiUtil.get({
      url: 'date_range_options',
      onSuccess: response => storeDateRanges(
        response.date_range_options.map(dateRange => dateRangeTransformer.transformDateRange(dateRange))
      ),
    });
  }
  return Promise.resolve();
}

export const SET_DATE_RANGES = 'SET_DATE_RANGES';
function storeDateRanges(dateRanges) {
  store.dispatch({ type: 'SET_DATE_RANGES', dateRanges });
}

export const SET_CURRENT_DATE_RANGE = 'SET_CURRENT_DATE_RANGE';
export function setCurrentDateRange(id) {
  store.dispatch({ type: 'SET_CURRENT_DATE_RANGE', id });
}

export const UPDATE_CURRENT_DATE_RANGE = 'UPDATE_CURRENT_DATE_RANGE';
export function updateCurrentDateRange(data) {
  store.dispatch({ type: 'UPDATE_CURRENT_DATE_RANGE', dateChange: data });
}
