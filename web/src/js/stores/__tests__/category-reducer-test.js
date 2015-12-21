import { List, Map, toJS } from 'immutable';
import categoryReducer from '../category-reducer';

describe('CategoryReducer', () => {
  let categoryTypes;
  beforeEach(() => {
    categoryTypes = [ { name: 'Income', editable: true }, { name: 'Transfer', editable: false } ];
  });

  it('has a default state', () => {
    const state = categoryReducer();
    expect(state.get('loaded')).toEqual(false);
    expect(state.get('categoryTypes').toJS()).toEqual([]);
  });

  describe('SET_CATEGORY_TYPES', () => {
    it('saves the given category types into the store', () =>{
      const initialState = categoryReducer();
      let action = { type: 'SET_CATEGORY_TYPES', categoryTypes: categoryTypes }
      let nextState = categoryReducer(initialState, action);
      expect(nextState.get('categoryTypes').toJS()).toEqual(categoryTypes);
      expect(nextState.get('editableCategoryTypes').toJS()).toEqual([categoryTypes[0]]);
      expect(nextState.get('loaded')).toEqual(true);
    });
  });
});
