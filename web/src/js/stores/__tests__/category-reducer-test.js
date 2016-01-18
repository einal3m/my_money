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
    expect(state.get('categoryTypesLoaded')).toEqual(false);
    expect(state.get('categoriesLoaded')).toEqual(false);
    expect(state.get('categoryTypes').toJS()).toEqual([]);
    expect(state.get('categories').toJS()).toEqual([]);
  });

  describe('SET_CATEGORY_TYPES', () => {
    it('stores the given category types into the store', () =>{
      let action = { type: 'SET_CATEGORY_TYPES', categoryTypes: categoryTypes }
      let nextState = categoryReducer(undefined, action);

      expect(nextState.get('categoryTypes').toJS()).toEqual(categoryTypes);
      expect(nextState.get('categoryTypesLoaded')).toEqual(true);
    });
  });

  describe('SET_CATEGORIES', () => {
    it('stores the categories with the category types', () => {
      let action = { type: 'SET_CATEGORIES', categories: categories }
      let nextState = categoryReducer(undefined, action);

      expect(nextState.get('categories').toJS()).toEqual(categories);
      expect(nextState.get('categoriesLoaded')).toEqual(true);
    });
  });

  describe('ADD_CATEGORY', () => {
    it('adds the category to the store', () => {
      let category = {id: 13, name: 'Melanie', categoryTypeId: 2}
      let action = { type: 'SET_CATEGORIES', categories: categories }
      let nextState = categoryReducer(undefined, action);
      action = {type: 'ADD_CATEGORY', category: category };
      nextState = categoryReducer(nextState, action);

      expect(nextState.get('categories').size).toEqual(3);
      expect(nextState.get('categories').last().toJS()).toEqual(category);
    });
  });

  describe('SET_CATEGORY', () => {
    it('updates the category in the store', () => {
      let updatedCategory = {id: 12, name: 'NewName', categoryTypeId: 3};

      let action = { type: 'SET_CATEGORIES', categories: categories }
      let nextState = categoryReducer(undefined, action);
      action = {type: 'SET_CATEGORY', category: updatedCategory };
      nextState = categoryReducer(nextState, action);

      expect(nextState.get('categories').size).toEqual(2);
      expect(nextState.get('categories').first().toJS()).toEqual(categories[0]);
      expect(nextState.get('categories').last().toJS()).toEqual(updatedCategory);
    });
  });
});
