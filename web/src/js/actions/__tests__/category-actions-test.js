import categoryActions from '../category-actions';
import categoryApi from '../../services/category-api';
import store from '../../stores/store';
import { fromJS } from 'immutable';

describe('CategoryActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('category type actions', () => {
    it('fetchCategoryTypes gets a list of category types', () => {
      spyOn(categoryApi, 'getCategoryTypes');
      categoryActions.fetchCategoryTypes();
      expect(categoryApi.getCategoryTypes).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('storeCategoryTypes dispatches the category type data to the store', () => {
      categoryActions.storeCategoryTypes('categoryTypes');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORY_TYPES',
        categoryTypes: 'categoryTypes'
      });
    });
  });

  describe('category actions', () => {
    describe('fetchCategories', () => {
      it('retrieves the categories if category types are loaded', () => {
        spyOn(store, 'getState').and.returnValue({
          categoryStore: fromJS({categoryTypesLoaded: true, categoryTypes: [{id: 45}]})
        });
        spyOn(categoryApi, 'getCategories');
        categoryActions.fetchCategories();
        expect(categoryApi.getCategories).toHaveBeenCalled();
      });

      it('retrieves category types if they are not loaded', () => {
        spyOn(store, 'getState').and.returnValue({
          categoryStore: fromJS({categoryTypesLoaded: false})
        });
        spyOn(categoryApi, 'getCategories');
        spyOn(categoryActions, 'fetchCategoryTypes');
        categoryActions.fetchCategories();
        expect(categoryApi.getCategories).not.toHaveBeenCalled();
        expect(categoryActions.fetchCategoryTypes).toHaveBeenCalled();
      });
    });

    it('storeCategories dispatches the categories to the store', () => {
      categoryActions.storeCategories(['categories']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORIES',
        categories: ['categories']
      });
    });

    it('createCategory calls the category api to create the category', () => {
      spyOn(categoryApi, 'createCategory');
      categoryActions.createCategory('category');
      expect(categoryApi.createCategory).toHaveBeenCalledWith('category');
    });

    it('saveCategory calls the category api to update the category', () => {
      spyOn(categoryApi, 'updateCategory');
      categoryActions.updateCategory('category');
      expect(categoryApi.updateCategory).toHaveBeenCalledWith('category');
    });

    it('addCategory dispatches the category to the store', () => {
      categoryActions.addCategory('category');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'ADD_CATEGORY',
        category: 'category'
      });
    });

    it('setCategory dispatches the category to the store', () => {
      categoryActions.setCategory('category');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORY',
        category: 'category'
      });
    });
  });
});
