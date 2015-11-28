import alt from '../../alt';
import staticDataActions from '../static-data-actions';
import staticDataService from '../../services/static-data-service';

describe('StaticDataActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(alt.dispatcher, 'dispatch');
  });

  describe('date range options', () => {
    it('fetchDateRanges gets a list of date range options', () => {
      spyOn(staticDataService, 'getDateRanges');
      staticDataActions.fetchDateRanges();
      expect(staticDataService.getDateRanges).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalled();
    });

    it('receiveDateRanges dispatches the data to the store', () => {
      staticDataActions.receiveDateRanges('dateRanges');
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual('dateRanges');
    });

    it('setCurrentDateRange dispatches the id to the store', () => {
      staticDataActions.setCurrentDateRange(45);
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual(45);
    });

    it('updateCurrentDateRange dispatches the data to the store', () => {
      staticDataActions.updateCurrentDateRange({fromDate: '2015-12-19'});
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual({fromDate: '2015-12-19'});
    });
  });
});
