import { List, Map, toJS } from 'immutable';
import categoryReducer from '../category-reducer';

describe('CategoryReducer', () => {
  let categoryTypes, categories, subcategories;
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

    subcategories = [
      {id: 22, name: 'Sub2', categoryId: 11},
      {id: 21, name: 'Sub1', categoryId: 12}
    ]
  });

  it('has a default state', () => {
    const state = categoryReducer();
    expect(state.get('categoryTypesLoaded')).toEqual(false);
    expect(state.get('categoriesLoaded')).toEqual(false);
    expect(state.get('subcategoriesLoaded')).toEqual(false);
    expect(state.get('categoryTypes').toJS()).toEqual([]);
    expect(state.get('categories').toJS()).toEqual([]);
    expect(state.get('subcategories').toJS()).toEqual([]);    
  });

  describe('SET_CATEGORY_TYPES', () => {
    it('stores the given category types into the store', () =>{
      let action = { type: 'SET_CATEGORY_TYPES', categoryTypes: categoryTypes };
      let nextState = categoryReducer(undefined, action);

      expect(nextState.get('categoryTypes').toJS()).toEqual(categoryTypes);
      expect(nextState.get('categoryTypesLoaded')).toEqual(true);
    });
  });

  describe('SET_CATEGORIES', () => {
    it('stores the categories into the store', () => {
      let action = { type: 'SET_CATEGORIES', categories: categories };
      let nextState = categoryReducer(undefined, action);

      expect(nextState.get('categories').toJS()).toEqual(categories);
      expect(nextState.get('categoriesLoaded')).toEqual(true);
    });
  });

  describe('SET_SUBCATEGORIES', () => {
    it('stores the categories into the store', () => {
      let action = { type: 'SET_SUBCATEGORIES', subcategories: subcategories };
      let nextState = categoryReducer(undefined, action);

      expect(nextState.get('subcategories').toJS()).toEqual(subcategories);
      expect(nextState.get('subcategoriesLoaded')).toEqual(true);
    });
  });

  describe('SET_CATEGORY', () => {
    it('adds the category to the store if it doesnt exist', () => {
      let newCategory = {id: 13, name: 'Melanie', categoryTypeId: 2};
      let action = { type: 'SET_CATEGORIES', categories: categories };
      let nextState = categoryReducer(undefined, action);
      action = {type: 'SET_CATEGORY', category: newCategory };
      nextState = categoryReducer(nextState, action);

      expect(nextState.get('categories').size).toEqual(3);
      expect(nextState.get('categories').last().toJS()).toEqual(newCategory);
    });

    it('updates the category if it does exist', () => {
      let updatedCategory = {id: 12, name: 'NewName', categoryTypeId: 3};

      let action = { type: 'SET_CATEGORIES', categories: categories };
      let nextState = categoryReducer(undefined, action);
      action = {type: 'SET_CATEGORY', category: updatedCategory };
      nextState = categoryReducer(nextState, action);

      expect(nextState.get('categories').size).toEqual(2);
      expect(nextState.get('categories').first().toJS()).toEqual(categories[0]);
      expect(nextState.get('categories').last().toJS()).toEqual(updatedCategory);
    });
  });

  describe('SET_SUBCATEGORY', () => {
    it('adds the subcategory to the store if it doesnt exist', () => {
      let newSubcategory = {id: 23, name: 'Melanie', categoryId: 11};
      let action = { type: 'SET_SUBCATEGORIES', subcategories: subcategories };
      let nextState = categoryReducer(undefined, action);
      action = {type: 'SET_SUBCATEGORY', subcategory: newSubcategory };
      nextState = categoryReducer(nextState, action);

      expect(nextState.get('subcategories').size).toEqual(3);
      expect(nextState.get('subcategories').last().toJS()).toEqual(newSubcategory);
    });

    it('updates the subcategory if it does exist', () => {
      let updatedSubcategory = {id: 22, name: 'NewName', categoryId: 12};

      let action = { type: 'SET_SUBCATEGORIES', subcategories: subcategories };
      let nextState = categoryReducer(undefined, action);
      action = {type: 'SET_SUBCATEGORY', subcategory: updatedSubcategory };
      nextState = categoryReducer(nextState, action);

      expect(nextState.get('subcategories').size).toEqual(2);
      expect(nextState.get('subcategories').first().toJS()).toEqual(updatedSubcategory);
      expect(nextState.get('subcategories').last().toJS()).toEqual(subcategories[1]);
    });
  });

});
