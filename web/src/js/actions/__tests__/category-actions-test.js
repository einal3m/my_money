import categoryActions, {
  setCurrentCategory, setCurrentSubcategory, fetchCategoryTypes, fetchCategories, fetchSubcategories,
  SET_CURRENT_CATEGORY, SET_CURRENT_SUBCATEGORY, SET_CATEGORY_TYPES, SET_CATEGORIES, SET_SUBCATEGORIES,
} from '../category-actions';
import categoryTransformer from '../../transformers/category-transformer';
import subcategoryTransformer from '../../transformers/subcategory-transformer';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';

describe('CategoryActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('fetchCategoryTypes', () => {
    it('fetches category types', () => {
      spyOn(apiUtil, 'get');

      fetchCategoryTypes();

      expect(apiUtil.get).toHaveBeenCalled();
      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('category_type2');
    });

    it('saves the category types to the store on success', () => {
      spyOn(apiUtil, 'get');

      fetchCategoryTypes();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      getArgs.onSuccess({ category_type2: ['types'] });

      expect(store.dispatch).toHaveBeenCalledWith({ type: SET_CATEGORY_TYPES, categoryTypes: ['types'] });
    });
  });

  describe('fetchCategories', () => {
    it('fetches categories', () => {
      spyOn(apiUtil, 'get');

      fetchCategories();

      expect(apiUtil.get).toHaveBeenCalled();
      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('categories');
    });

    it('saves the categories to the store on success', () => {
      spyOn(apiUtil, 'get');

      fetchCategories();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      spyOn(categoryTransformer, 'transformFromApi').and.returnValue('transformedCategory');

      getArgs.onSuccess({ categories: ['category'] });

      expect(store.dispatch).toHaveBeenCalledWith({ type: SET_CATEGORIES, categories: ['transformedCategory'] });
      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith('category');
    });
  });

  describe('fetchSubcategories', () => {
    it('fetches subcategories', () => {
      spyOn(apiUtil, 'get');

      fetchSubcategories();

      expect(apiUtil.get).toHaveBeenCalled();
      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('subcategories');
    });

    it('saves the subcategories to the store on success', () => {
      spyOn(apiUtil, 'get');

      fetchSubcategories();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      spyOn(subcategoryTransformer, 'transformFromApi').and.returnValue('transformedSubcategory');

      getArgs.onSuccess({ subcategories: ['subcategory'] });

      expect(store.dispatch).toHaveBeenCalledWith(
        { type: SET_SUBCATEGORIES, subcategories: ['transformedSubcategory'] }
      );
      expect(subcategoryTransformer.transformFromApi).toHaveBeenCalledWith('subcategory');
    });
  });

  describe('category actions', () => {
    describe('saveCategory', () => {
      it('calls createCategory when no id is present', () => {
        spyOn(categoryActions, 'createCategory');
        categoryActions.saveCategory({ name: 'Melanie' });
        expect(categoryActions.createCategory).toHaveBeenCalledWith({ name: 'Melanie' });
        expect(dispatcherSpy).toHaveBeenCalledWith({ type: 'SAVE_CATEGORY' });
      });

      it('calls updateCategory when id is present', () => {
        spyOn(categoryActions, 'updateCategory');
        categoryActions.saveCategory({ id: 1, name: 'Melanie' });
        expect(categoryActions.updateCategory).toHaveBeenCalledWith({ id: 1, name: 'Melanie' });
        expect(dispatcherSpy).toHaveBeenCalledWith({ type: 'SAVE_CATEGORY' });
      });
    });

    it('createCategory calls apiUtil.post with callback', () => {
      spyOn(apiUtil, 'post');
      spyOn(categoryTransformer, 'transformToApi').and.returnValue('transformedCategory');

      categoryActions.createCategory('category');

      expect(categoryTransformer.transformToApi).toHaveBeenCalledWith('category');
      expect(apiUtil.post).toHaveBeenCalled();

      const postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('categories');

      spyOn(categoryTransformer, 'transformFromApi').and.returnValue('newCategory');
      spyOn(categoryActions, 'storeCategory');
      const successCallback = postArgs.onSuccess;
      successCallback({ category: 'categoryFromApi' });

      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith('categoryFromApi');
      expect(categoryActions.storeCategory).toHaveBeenCalledWith('newCategory');
    });

    it('updateCategory calls apiUtil.put with callback', () => {
      const category = { id: 23, name: 'Cat' };
      spyOn(apiUtil, 'put');
      spyOn(categoryTransformer, 'transformToApi').and.returnValue('transformedCategory');

      categoryActions.updateCategory(category);

      expect(categoryTransformer.transformToApi).toHaveBeenCalledWith(category);
      expect(apiUtil.put).toHaveBeenCalled();

      const putArgs = apiUtil.put.calls.argsFor(0)[0];
      expect(putArgs.url).toEqual('categories/23');
      expect(putArgs.body).toEqual({ category: 'transformedCategory' });

      spyOn(categoryTransformer, 'transformFromApi').and.returnValue('updatedCategory');
      spyOn(categoryActions, 'storeCategory');
      const successCallback = putArgs.onSuccess;
      successCallback({ category: 'categoryFromApi' });

      expect(categoryTransformer.transformFromApi).toHaveBeenCalledWith('categoryFromApi');
      expect(categoryActions.storeCategory).toHaveBeenCalledWith('updatedCategory');
    });

    it('deleteCategory calls apiUtil.destroy with callback', () => {
      spyOn(apiUtil, 'delete');
      categoryActions.deleteCategory(23);
      expect(apiUtil.delete).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalledWith({ type: 'DELETE_CATEGORY' });

      const deleteArgs = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('categories/23');

      spyOn(categoryActions, 'removeCategory');
      const successCallback = deleteArgs.onSuccess;
      successCallback();
      expect(categoryActions.removeCategory).toHaveBeenCalledWith(23);
    });

    it('storeCategory dispatches the category to the store', () => {
      categoryActions.storeCategory('category');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORY',
        category: 'category',
      });
    });

    it('removeCategory dispatches the category id to the store', () => {
      categoryActions.removeCategory(13);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'REMOVE_CATEGORY',
        categoryId: 13,
      });
    });
  });

  describe('subcategory actions', () => {
    describe('saveSubcategory', () => {
      it('calls createSubcategory when no id is present', () => {
        spyOn(categoryActions, 'createSubcategory');
        categoryActions.saveSubcategory({ name: 'Melanie' });
        expect(categoryActions.createSubcategory).toHaveBeenCalledWith({ name: 'Melanie' });
        expect(dispatcherSpy).toHaveBeenCalledWith({ type: 'SAVE_SUBCATEGORY' });
      });

      it('calls updateSubcategory when id is present', () => {
        spyOn(categoryActions, 'updateSubcategory');
        categoryActions.saveSubcategory({ id: 1, name: 'Melanie' });
        expect(categoryActions.updateSubcategory).toHaveBeenCalledWith({ id: 1, name: 'Melanie' });
        expect(dispatcherSpy).toHaveBeenCalledWith({ type: 'SAVE_SUBCATEGORY' });
      });
    });

    it('createSubcategory calls apiUtil.post with callback', () => {
      spyOn(apiUtil, 'post');
      spyOn(subcategoryTransformer, 'transformToApi').and.returnValue('transformedSubcategory');

      categoryActions.createSubcategory('subcategory');

      expect(subcategoryTransformer.transformToApi).toHaveBeenCalledWith('subcategory');
      expect(apiUtil.post).toHaveBeenCalled();

      const postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('subcategories');

      spyOn(subcategoryTransformer, 'transformFromApi').and.returnValue('newSubcategory');
      spyOn(categoryActions, 'storeSubcategory');
      const successCallback = postArgs.onSuccess;
      successCallback({ subcategory: 'subcategoryFromApi' });

      expect(subcategoryTransformer.transformFromApi).toHaveBeenCalledWith('subcategoryFromApi');
      expect(categoryActions.storeSubcategory).toHaveBeenCalledWith('newSubcategory');
    });

    it('updateSubcategory calls apiUtil.put with callback', () => {
      const subcategory = { id: 11, name: 'Sub' };
      spyOn(apiUtil, 'put');
      spyOn(subcategoryTransformer, 'transformToApi').and.returnValue('transformedSubcategory');

      categoryActions.updateSubcategory(subcategory);

      expect(subcategoryTransformer.transformToApi).toHaveBeenCalledWith(subcategory);
      expect(apiUtil.put).toHaveBeenCalled();

      const putArgs = apiUtil.put.calls.argsFor(0)[0];
      expect(putArgs.url).toEqual('subcategories/11');

      spyOn(subcategoryTransformer, 'transformFromApi').and.returnValue('updatedSubcategory');
      spyOn(categoryActions, 'storeSubcategory');
      const successCallback = putArgs.onSuccess;
      successCallback({ subcategory: 'subcategoryFromApi' });

      expect(subcategoryTransformer.transformFromApi).toHaveBeenCalledWith('subcategoryFromApi');
      expect(categoryActions.storeSubcategory).toHaveBeenCalledWith('updatedSubcategory');
    });

    it('deleteSubcategory calls apiUtil.delete with callback', () => {
      spyOn(apiUtil, 'delete');
      categoryActions.deleteSubcategory(43);
      expect(apiUtil.delete).toHaveBeenCalled();
      expect(dispatcherSpy).toHaveBeenCalledWith({ type: 'DELETE_SUBCATEGORY' });

      const deleteArgs = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('subcategories/43');

      spyOn(categoryActions, 'removeSubcategory');
      const successCallback = deleteArgs.onSuccess;
      successCallback();
      expect(categoryActions.removeSubcategory).toHaveBeenCalledWith(43);
    });

    it('storeSubcategory dispatches the subcategory to the store', () => {
      categoryActions.storeSubcategory('subcategory');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_SUBCATEGORY',
        subcategory: 'subcategory',
      });
    });

    it('removeSubcategory dispatches the subcategory id to the store', () => {
      categoryActions.removeSubcategory(14);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'REMOVE_SUBCATEGORY',
        subcategoryId: 14,
      });
    });
  });

  describe('setCurrentCategory', () => {
    it('dispatches the id to the store', () => {
      setCurrentCategory(11);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_CURRENT_CATEGORY,
        categoryId: 11,
      });
    });
  });

  describe('setCurrentSubcategory', () => {
    it('dispatches the id to the store', () => {
      setCurrentSubcategory(13);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SET_CURRENT_SUBCATEGORY,
        subcategoryId: 13,
      });
    });
  });
});
