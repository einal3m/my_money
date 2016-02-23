import apiStatusActions from '../api-status-actions';
import store from '../../stores/store';

describe('ApiStatusActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('storeApiError', () => {
    it('dispatches the error message to the store', () => {
      apiStatusActions.storeApiError('myMessage');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_API_ERROR',
        message: 'myMessage'
      });
    });
  });

  describe('clearApiError', () => {
    it('dispatches the action to the store', () => {
      apiStatusActions.clearApiError();
      expect(dispatcherSpy).toHaveBeenCalledWith({type: 'CLEAR_API_ERROR'});
    });
  });
});
