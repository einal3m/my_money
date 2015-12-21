import categoryActions from '../category-actions';
import categoryApi from '../../services/category-api';
import store from '../../stores/store';

describe('CategoryActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('category type actions', () => {
    it('fetchCategoryTypes gets a list of category types', () => {
      spyOn(categoryApi, 'index');
      categoryActions.fetchCategoryTypes();
      expect(categoryApi.index).toHaveBeenCalled();
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
    it('create category calls the category api to create the category', () => {
      spyOn(categoryApi, 'createCategory');
      categoryActions.createCategory('category');
      expect(categoryApi.createCategory).toHaveBeenCalledWith('category');
    });

    it('dispatches the category to the store', () => {
      categoryActions.storeCategory('category');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'ADD_CATEGORY',
        category: 'category'
      });
    });
  });
});
