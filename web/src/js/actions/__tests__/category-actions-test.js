import categoryActions from '../category-actions';
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
    describe('saveCategory', () => {
      it('calls createCategory when no id is present', () => {
        spyOn(categoryActions, 'createCategory');
        categoryActions.saveCategory({name: 'Melanie'});
        expect(categoryActions.createCategory).toHaveBeenCalledWith({name: 'Melanie'});
      });

      it('calls updateCategory when id is present', () => {
        spyOn(categoryActions, 'updateCategory');
        categoryActions.saveCategory({id: 1, name: 'Melanie'});
        expect(categoryActions.updateCategory).toHaveBeenCalledWith({id: 1, name: 'Melanie'});
      });
    });

    it('storeCategories dispatches the categories to the store', () => {
      categoryActions.storeCategories(['categories']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORIES',
        categories: ['categories']
      });
    });

    it('storeCategory dispatches the category to the store', () => {
      categoryActions.storeCategory('category');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORY',
        category: 'category'
      });
    });
  });

  describe('subcategory actions', () => {
    describe('saveSubcategory', () => {
      it('calls createSubcategory when no id is present', () => {
        spyOn(categoryActions, 'createSubcategory');
        categoryActions.saveSubcategory({name: 'Melanie'});
        expect(categoryActions.createSubcategory).toHaveBeenCalledWith({name: 'Melanie'});
      });

      it('calls updateSubcategory when id is present', () => {
        spyOn(categoryActions, 'updateSubcategory');
        categoryActions.saveSubcategory({id: 1, name: 'Melanie'});
        expect(categoryActions.updateSubcategory).toHaveBeenCalledWith({id: 1, name: 'Melanie'});
      });
    });

    it('storeSubcategories dispatches the subcategories to the store', () => {
      categoryActions.storeSubcategories(['subcategories']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_SUBCATEGORIES',
        subcategories: ['subcategories']
      });
    });

    it('storeSubcategory dispatches the subcategory to the store', () => {
      categoryActions.storeSubcategory('subcategory');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_SUBCATEGORY',
        subcategory: 'subcategory'
      });
    });
  });
});
