import { Map } from 'immutable';
import categoryReducer from '../category-reducer';
import { SET_CURRENT_CATEGORY, SET_CURRENT_SUBCATEGORY } from '../../actions/category-actions';

describe('CategoryReducer', () => {
  const categories = [
    { id: 11, name: 'Expense1', categoryTypeId: 3 },
    { id: 12, name: 'Income1', categoryTypeId: 2 },
  ];
  const categoryTypes = [
    { id: 2, name: 'Income', code: 'income', editable: true },
    { id: 1, name: 'Transfer', code: 'transfer', editable: false },
    { id: 3, name: 'Expense', code: 'expense', editable: true },
  ];

  const subcategories = [
    { id: 22, name: 'Sub2', categoryId: 11 },
    { id: 21, name: 'Sub1', categoryId: 12 },
  ];

  it('has a default state', () => {
    const state = categoryReducer();
    expect(state.get('categoryTypesLoaded')).toEqual(false);
    expect(state.get('categoriesLoaded')).toEqual(false);
    expect(state.get('subcategoriesLoaded')).toEqual(false);
    expect(state.get('categoryTypes').toJS()).toEqual([]);
    expect(state.get('categories').toJS()).toEqual([]);
    expect(state.get('subcategories').toJS()).toEqual([]);
    expect(state.get('currentCategoryId')).toEqual(null);
    expect(state.get('currentSubcategoryId')).toEqual(null);
  });

  describe('SET_CATEGORY_TYPES', () => {
    it('stores the given category types into the store', () => {
      const action = { type: 'SET_CATEGORY_TYPES', categoryTypes };
      const nextState = categoryReducer(undefined, action);

      expect(nextState.get('categoryTypes').toJS()).toEqual(categoryTypes);
      expect(nextState.get('categoryTypesLoaded')).toEqual(true);
    });
  });

  describe('category actions', () => {
    let loadedState;
    beforeEach(() => {
      const action = { type: 'SET_CATEGORIES', categories };
      loadedState = categoryReducer(undefined, action);
    });

    describe('SET_CATEGORIES', () => {
      it('stores the categories into the store', () => {
        expect(loadedState.get('categories').toJS()).toEqual(categories);
        expect(loadedState.get('categoriesLoaded')).toEqual(true);
      });
    });

    describe('SET_CATEGORY', () => {
      it('adds the category to the store if it doesnt exist', () => {
        const newCategory = { id: 13, name: 'Melanie', categoryTypeId: 2 };
        const action = { type: 'SET_CATEGORY', category: newCategory };
        const state = categoryReducer(loadedState, action);

        expect(state.get('categories').size).toEqual(3);
        expect(state.get('categories').last().toJS()).toEqual(newCategory);
      });

      it('updates the category if it does exist', () => {
        const updatedCategory = { id: 12, name: 'NewName', categoryTypeId: 3 };
        const action = { type: 'SET_CATEGORY', category: updatedCategory };
        const state = categoryReducer(loadedState, action);

        expect(state.get('categories').size).toEqual(2);
        expect(state.get('categories').first().toJS()).toEqual(categories[0]);
        expect(state.get('categories').last().toJS()).toEqual(updatedCategory);
      });
    });

    describe('REMOVE_CATEGORY', () => {
      it('removes the category from the store', () => {
        const action = { type: 'REMOVE_CATEGORY', categoryId: 11 };
        const state = categoryReducer(loadedState, action);

        expect(state.get('categories').size).toEqual(1);
        expect(state.get('categories').first().toJS()).toEqual(categories[1]);
      });
    });
  });

  describe('subcategories', () => {
    let loadedState;
    beforeEach(() => {
      const action = { type: 'SET_SUBCATEGORIES', subcategories };
      loadedState = categoryReducer(undefined, action);
    });

    describe('SET_SUBCATEGORIES', () => {
      it('stores the categories into the store', () => {
        expect(loadedState.get('subcategories').toJS()).toEqual(subcategories);
        expect(loadedState.get('subcategoriesLoaded')).toEqual(true);
      });
    });
    describe('SET_SUBCATEGORY', () => {
      it('adds the subcategory to the store if it doesnt exist', () => {
        const newSubcategory = { id: 23, name: 'Melanie', categoryId: 11 };
        const action = { type: 'SET_SUBCATEGORY', subcategory: newSubcategory };
        const state = categoryReducer(loadedState, action);

        expect(state.get('subcategories').size).toEqual(3);
        expect(state.get('subcategories').last().toJS()).toEqual(newSubcategory);
      });

      it('updates the subcategory if it does exist', () => {
        const updatedSubcategory = { id: 22, name: 'NewName', categoryId: 12 };
        const action = { type: 'SET_SUBCATEGORY', subcategory: updatedSubcategory };
        const state = categoryReducer(loadedState, action);

        expect(state.get('subcategories').size).toEqual(2);
        expect(state.get('subcategories').first().toJS()).toEqual(updatedSubcategory);
        expect(state.get('subcategories').last().toJS()).toEqual(subcategories[1]);
      });
    });

    describe('REMOVE_SUBCATEGORY', () => {
      it('removes the subcategory from the store', () => {
        const action = { type: 'REMOVE_SUBCATEGORY', subcategoryId: 21 };
        const state = categoryReducer(loadedState, action);

        expect(state.get('subcategories').size).toEqual(1);
        expect(state.get('subcategories').first().toJS()).toEqual(subcategories[0]);
      });
    });
  });

  describe('SET_CURRENT_CATEGORY', () => {
    it('sets the currentCategoryId in the store, and sets currentSubcategoryId to null', () => {
      const action = { type: SET_CURRENT_CATEGORY, categoryId: 21 };
      const state = categoryReducer(Map({ currentSubcategoryId: 23 }), action);

      expect(state.get('currentCategoryId')).toEqual(21);
      expect(state.get('currentSubcategoryId')).toEqual(null);
    });
  });

  describe('SET_CURRENT_SUBCATEGORY', () => {
    it('sets the currentSubcategoryId in the store', () => {
      const action = { type: SET_CURRENT_SUBCATEGORY, subcategoryId: 14 };
      const state = categoryReducer(undefined, action);

      expect(state.get('currentSubcategoryId')).toEqual(14);
    });
  });
});
