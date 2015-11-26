import alt from '../../alt';
import staticDataActions from '../static-data-actions';
import staticDataService from '../../services/static-data-service';

describe('StaticDataActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(alt.dispatcher, 'dispatch');
  });

  describe('fetchDateRanges', () => {
    it('gets a list of date range options', () => {
      spyOn(staticDataService, 'getDateRanges');
      staticDataActions.fetchDateRanges();
      expect(staticDataService.getDateRanges).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalled();
    });
  }); 

  describe('receiveDateRanges', () => {
    it('dispatches the data to the store', () => {
      staticDataActions.receiveDateRanges('dateRanges');
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual('dateRanges');
    });
  });
});
