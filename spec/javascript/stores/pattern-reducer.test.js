import { Map } from 'immutable';
import patternReducer from 'stores/pattern-reducer';
import {
  SET_PATTERNS,
  GET_PATTERNS,
} from 'actions/pattern-actions';

describe('PatternReducer', () => {
  const pattern = { id: 11, matchText: 'Description', notes: 'my note', categoryId: 4, subcategoryId: 6 };

  it('has a default state', () => {
    const state = patternReducer();
    expect(state.get('loaded')).toEqual(false);
    expect(state.get('patterns').toJS()).toEqual([]);
  });

  describe('SET_PATTERNS', () => {
    it('stores the given patterns into the store', () => {
      const action = { type: SET_PATTERNS, patterns: [pattern] };
      const nextState = patternReducer(undefined, action);

      expect(nextState.get('patterns').toJS()).toEqual([pattern]);
      expect(nextState.get('loaded')).toEqual(true);
    });
  });

  describe('GET_PATTERNS', () => {
    it('sets loaded to false', () => {
      const action = { type: GET_PATTERNS };
      const nextState = patternReducer(Map({ loaded: true }), action);

      expect(nextState.get('loaded')).toEqual(false);
    });
  });
});
