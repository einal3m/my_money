import dateRangeActions from '../date-range-actions';
import dateRangeApi from '../../services/date-range-api';
import store from '../../stores/store';

describe('DateRangeActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('date range options', () => {
    it('fetchDateRanges gets a list of date range options', () => {
      spyOn(dateRangeApi, 'index');
      dateRangeActions.fetchDateRanges();
      expect(dateRangeApi.index).toHaveBeenCalled();
    });

    it('storeDateRanges dispatches the date range data to the store', () => {
      dateRangeActions.storeDateRanges('dateRanges');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_DATE_RANGES',
        dateRanges: 'dateRanges'
      });
    });

    it('setCurrentDateRange dispatches the id to the store', () => {
      dateRangeActions.setCurrentDateRange(45);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CURRENT_DATE_RANGE',
        id: 45
      });
    });

    it('updateCurrentDateRange dispatches the data to the store', () => {
      dateRangeActions.updateCurrentDateRange({fromDate: '2015-12-19'});
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'UPDATE_CURRENT_DATE_RANGE',
        dateChange: {fromDate: '2015-12-19'}
      });
    });
  });
});
