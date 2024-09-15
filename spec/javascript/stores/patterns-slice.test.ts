import { patternsSlice, setPatterns, getPatterns } from '../../../app/javascript/stores/patterns-slice';

describe('PatternsSlice', () => {
  const pattern = {
    id: 11,
    accountId: 2,
    matchText: 'Description',
    notes: 'my note',
    categoryId: 4,
    subcategoryId: 6
  };

  it('has a default state', () => {
    const state = patternsSlice.getInitialState();
    expect(state.loaded).toEqual(false);
    expect(state.patterns).toEqual([]);
  });

  describe('set patterns', () => {
    it('stores the given patterns into the store', () => {
      const action = setPatterns([pattern])
      const nextState = patternsSlice.reducer(undefined, action);

      expect(nextState.patterns).toEqual([pattern]);
      expect(nextState.loaded).toEqual(true);
    });
  });

  describe('GET_PATTERNS', () => {
    it('sets loaded to false', () => {
      const action = getPatterns()
      const nextState = patternsSlice.reducer(undefined, action)

      expect(nextState.loaded).toEqual(false);
    });
  });
});
