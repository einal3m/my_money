import { fromJS } from 'immutable';
import * as patternActions from '../pattern-actions';
import store from '../../stores/store';
import apiUtil from '../../util/api-util';

describe('PatternActions', () => {
  beforeEach(() => {
    spyOn(store, 'dispatch');
  });

  describe('getPatterns', () => {
    // figure out how to test promises :)
  });

  describe('fetchPatterns', () => {
    it('makes an ajax request to GET patterns and calls callback on success', () => {
      spyOn(apiUtil, 'get').and.returnValue(Promise.resolve());
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ currentAccount: { id: 12 } }) });

      const promise = patternActions.fetchPatterns();

      expect(apiUtil.get).toHaveBeenCalled();
      expect(promise.then).toBeDefined();
      expect(store.dispatch).toHaveBeenCalledWith({ type: patternActions.GET_PATTERNS });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts/12/patterns');

      const successCallback = getArgs.onSuccess;
      successCallback({ patterns: ['pattern'] });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: patternActions.SET_PATTERNS,
        patterns: ['pattern'],
      });
    });
  });
});
