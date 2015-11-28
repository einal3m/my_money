import alt from '../../alt';
import staticDataStore from '../static-data-store';
import staticDataActions from '../../actions/static-data-actions';

describe('StaticDataStore', () => {
  let dateRanges;
  beforeEach(() => {
    dateRanges = [
      { id: 11, name: 'Name1', default: false, custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', default: true, custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ];
  });

  afterEach(() => {
    alt.recycle();
  });

  it('has a default state', () => {
    expect(staticDataStore.getState().dateRanges).toEqual([]);
    expect(staticDataStore.getState().currentDateRange).toEqual(null);
    expect(staticDataStore.getState().loading).toEqual(false);
  });

  describe('onFetchDateRanges', () => {
    it('sets loading to true and resets date range array', () => {
      alt.dispatcher.dispatch({action: staticDataActions.FETCH_DATE_RANGES});

      expect(staticDataStore.getState().dateRanges).toEqual([]);
      expect(staticDataStore.getState().currentDateRange).toEqual(null);
      expect(staticDataStore.getState().loading).toEqual(true);    
    });
  });

  describe('onReceiveDateRanges', () => {
    it('sets loading to true and resets date range array', () => {
      alt.dispatcher.dispatch({action: staticDataActions.RECEIVE_DATE_RANGES, data: dateRanges});

      expect(staticDataStore.getState().dateRanges).toEqual(dateRanges);
      expect(staticDataStore.getState().loading).toEqual(false);    
    });

    it('sets the current date range to the default date range', () => {
      alt.dispatcher.dispatch({action: staticDataActions.RECEIVE_DATE_RANGES, data: dateRanges});

      expect(staticDataStore.getState().currentDateRange).toEqual(dateRanges[1]);
    });
  });

  describe('setCurrentDateRange', () => {
    it('sets currentDateRange', () => {
      alt.dispatcher.dispatch({action: staticDataActions.RECEIVE_DATE_RANGES, data: dateRanges});
      alt.dispatcher.dispatch({action: staticDataActions.SET_CURRENT_DATE_RANGE, data: 11});

      expect(staticDataStore.getState().currentDateRange).toEqual(dateRanges[0]);
    });
  });

  describe('onUpdateDateRange', () => {
    it('updates the currently selected date range', () => {
      alt.dispatcher.dispatch({action: staticDataActions.RECEIVE_DATE_RANGES, data: dateRanges});

      alt.dispatcher.dispatch({action: staticDataActions.UPDATE_CURRENT_DATE_RANGE, data: {fromDate: '2015-07-01'}});
      expect(staticDataStore.getState().dateRanges[1].fromDate).toEqual('2015-07-01');
      expect(staticDataStore.getState().dateRanges[1].toDate).toEqual('2014-09-03'); //unchanged
      expect(staticDataStore.getState().dateRanges[1]).toEqual(staticDataStore.getState().currentDateRange);

      alt.dispatcher.dispatch({action: staticDataActions.UPDATE_CURRENT_DATE_RANGE, data: {toDate: '2016-07-01'}});
      expect(staticDataStore.getState().dateRanges[1].fromDate).toEqual('2015-07-01'); //unchanged
      expect(staticDataStore.getState().dateRanges[1].toDate).toEqual('2016-07-01');
      expect(staticDataStore.getState().dateRanges[1]).toEqual(staticDataStore.getState().currentDateRange);
    });
  });
});
