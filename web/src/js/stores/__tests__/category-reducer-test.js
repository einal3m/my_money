import { List, Map, toJS } from 'immutable';
import categoryReducer from '../category-reducer';

describe('CategoryReducer', () => {
  let categoryTypes, categories;
  beforeEach(() => {
    categories = [
      {id: 11, name: 'Expense1', categoryTypeId: 3},
      {id: 12, name: 'Income1', categoryTypeId: 2}
    ];
    categoryTypes = [
      { id: 2, name: 'Income', code: 'income', editable: true },
      { id: 1, name: 'Transfer', code: 'transfer', editable: false },
      { id: 3, name: 'Expense', code: 'expense', editable: true }
    ];
  });

  it('has a default state', () => {
    const state = categoryReducer();
    expect(state.get('loaded')).toEqual(false);
    expect(state.get('categoryTypes').toJS()).toEqual([]);
    expect(state.get('categories').toJS()).toEqual([]);
  });

  describe('SET_CATEGORY_TYPES', () => {
    it('stores the given category types into the store', () =>{
      const initialState = categoryReducer();
      let action = { type: 'SET_CATEGORY_TYPES', categoryTypes: categoryTypes }
      let nextState = categoryReducer(initialState, action);
      expect(nextState.get('categoryTypes').toJS()).toEqual(categoryTypes);
      expect(nextState.get('editableCategoryTypes').toJS()).toEqual([categoryTypes[0], categoryTypes[2]]);
      expect(nextState.get('loaded')).toEqual(true);
    });
  });

  describe('SET_CATEGORIES', () => {
    it('stores the categories with the category types', () => {
      const initialState = categoryReducer();
      let action = { type: 'SET_CATEGORY_TYPES', categoryTypes: categoryTypes }
      let nextState = categoryReducer(initialState, action);
      action = { type: 'SET_CATEGORIES', categories: categories }
      nextState = categoryReducer(nextState, action);
      expect(nextState.get('categories').toJS()).toEqual(categories);
      expect(nextState.get('categoriesByType').get('income').toJS()).toEqual([categories[1]])
    });
  });

  describe('ADD_CATEGORY', () => {
    it('adds the category to the store', () => {
      let category = {id: 13, name: 'Melanie', categoryTypeId: 2}
      const initialState = categoryReducer();
      let action = { type: 'SET_CATEGORY_TYPES', categoryTypes: categoryTypes }
      let nextState = categoryReducer(initialState, action);
      action = { type: 'SET_CATEGORIES', categories: categories }
      nextState = categoryReducer(nextState, action);
      action = {type: 'ADD_CATEGORY', category: category };
      nextState = categoryReducer(nextState, action);

      expect(nextState.get('categories').size).toEqual(3);
      expect(nextState.get('categories').last().toJS()).toEqual(category);
      expect(nextState.get('categoriesByType').get('income').toJS()).toEqual([categories[1], category])
    });
  });
});
