import categoryApi from '../services/category-api';
import store from '../stores/store';

class CategoryActions {
  fetchCategoryTypes(callback) {
    categoryApi.getCategoryTypes(callback);
  }

  storeCategoryTypes(categoryTypes) {
    store.dispatch({
      type: 'SET_CATEGORY_TYPES',
      categoryTypes: categoryTypes
    });
  }

  fetchCategories() {
    let categoryTypesLoaded = store.getState().categoryStore.get('categoryTypesLoaded');
    if (!categoryTypesLoaded) {
      this.fetchCategoryTypes(this.fetchCategories.bind(this));
    } else {
      categoryApi.getCategories();
    }
  }

  storeCategories(categories) {
    store.dispatch({
      type: 'SET_CATEGORIES',
      categories: categories
    })
  }

  createCategory(category) {
    categoryApi.createCategory(category);
  }

  updateCategory(category) {
    categoryApi.updateCategory(category);
  }

  addCategory(category) {
    store.dispatch({
      type: 'ADD_CATEGORY',
      category: category
    });
  }

  setCategory(category) {
    store.dispatch({
      type: 'SET_CATEGORY',
      category: category
    });
  }
}

export default new CategoryActions();
