import categoryActions from '../category-actions';
import categoryApi from '../../apis/category-api';
import store from '../../stores/store';
import { fromJS } from 'immutable';

describe('CategoryActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('getCategories', () => {
    //TODO: work out how to test promises
    xit('calls the api util to get category types, categories and subcategories', () => {

    });
  });

  describe('category type actions', () => {
    it('storeCategoryTypes dispatches the category type data to the store', () => {
      categoryActions.storeCategoryTypes('categoryTypes');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORY_TYPES',
        categoryTypes: 'categoryTypes'
      });
    });
  });

  describe('category actions', () => {
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

  describe('subcateory actions', () => {
    it('storeSubcategories dispatches the subcategories to the store', () => {
      categoryActions.storeSubcategories(['subcategories']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_SUBCATEGORIES',
        subcategories: ['subcategories']
      });
    });
  });
});
