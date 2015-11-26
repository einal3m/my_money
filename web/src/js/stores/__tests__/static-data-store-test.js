import alt from '../../alt';
import staticDataStore from '../static-data-store';
import staticDataActions from '../../actions/static-data-actions';

describe('StaticDataStore', () => {
  afterEach(() => {
    alt.recycle();
  });

  it('has a default state', () => {
    expect(staticDataStore.getState().dateRanges).toEqual([]);
    expect(staticDataStore.getState().loading).toEqual(false);    
  });

  describe('onFetchDateRanges', () => {
    it('sets loading to true and resets date range array', () => {
      alt.dispatcher.dispatch({action: staticDataActions.FETCH_DATE_RANGES});

      expect(staticDataStore.getState().dateRanges).toEqual([]);
      expect(staticDataStore.getState().loading).toEqual(true);    
    });
  });

  describe('onReceiveDateRanges', () => {
    it('sets loading to true and resets date range array', () => {
      alt.dispatcher.dispatch({action: staticDataActions.RECEIVE_DATE_RANGES, data: ['dateRanges']});

      expect(staticDataStore.getState().dateRanges).toEqual(['dateRanges']);
      expect(staticDataStore.getState().loading).toEqual(false);    
    });
  });
});
