import { fromJS } from 'immutable';
import * as dateRangeActions from '../date-range-actions';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';
import dateRangeTransformer from '../../transformers/date-range-transformer';

describe('DateRangeActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('get date range options', () => {
    it('getDateRanges calls the date range option api', () => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({ dateRangeStore: fromJS({ loaded: false }) });

      dateRangeActions.getDateRanges();
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: dateRangeActions.GET_DATE_RANGES });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('date_range_options');

      spyOn(dateRangeTransformer, 'transformDateRange').and.returnValue('dateRange');
      const successCallback = getArgs.onSuccess;
      successCallback({ date_range_options: ['date_range'] });

      expect(dateRangeTransformer.transformDateRange).toHaveBeenCalledWith('date_range');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: dateRangeActions.SET_DATE_RANGES,
        dateRanges: ['dateRange'],
      });
    });

    it('doesnt call the api if date ranges are already loaded', () => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({ dateRangeStore: fromJS({ loaded: true }) });

      const promise = dateRangeActions.getDateRanges();

      expect(apiUtil.get).not.toHaveBeenCalled();
      expect(promise.then).toBeDefined();
    });
  });

  it('setCurrentDateRange dispatches the id to the store', () => {
    dateRangeActions.setCurrentDateRange(45);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: dateRangeActions.SET_CURRENT_DATE_RANGE,
      id: 45,
    });
  });

  it('updateCurrentDateRange dispatches the data to the store', () => {
    dateRangeActions.updateCurrentDateRange({ fromDate: '2015-12-19' });
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: dateRangeActions.UPDATE_CURRENT_DATE_RANGE,
      dateChange: { fromDate: '2015-12-19' },
    });
  });
});
