import categoryApi from '../services/category-api';
import store from '../stores/store';

class CategoryActions {
  fetchCategoryTypes(callBack) {
    categoryApi.index(callBack);
  }

  storeCategoryTypes(categoryTypes) {
    store.dispatch({
      type: 'SET_CATEGORY_TYPES',
      categoryTypes: categoryTypes
    });
  }

  createCategory(category) {
    categoryApi.createCategory(category);
  }

  storeCategory(category) {
    store.dispatch({
      type: 'ADD_CATEGORY',
      category: category
    });
  }
}

export default new CategoryActions();
