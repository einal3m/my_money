import store from '../stores/store';
import apiUtil from '../util/api-util';
import categoryTransformer from '../transformers/category-transformer';
import subcategoryTransformer from '../transformers/subcategory-transformer';
import { categoryDataLoaded } from '../selectors/category-selector';

class CategoryActions {
  saveCategory(category) {
    store.dispatch({ type: 'SAVE_CATEGORY' });
    if (category.id) {
      this.updateCategory(category);
    } else {
      this.createCategory(category);
    }
  }

  createCategory(category) {
    return apiUtil.post({
      url: 'categories',
      body: { category: categoryTransformer.transformToApi(category) },
      onSuccess: response => this.storeCategory(categoryTransformer.transformFromApi(response.category)),
    });
  }

  updateCategory(category) {
    return apiUtil.put({
      url: `categories/${category.id}`,
      body: { category: categoryTransformer.transformToApi(category) },
      onSuccess: response => this.storeCategory(categoryTransformer.transformFromApi(response.category)),
    });
  }

  deleteCategory(categoryId) {
    store.dispatch({ type: 'DELETE_CATEGORY' });
    return apiUtil.delete({
      url: `categories/${categoryId}`,
      onSuccess: () => this.removeCategory(categoryId),
    });
  }

  saveSubcategory(subcategory) {
    store.dispatch({ type: 'SAVE_SUBCATEGORY' });
    if (subcategory.id) {
      this.updateSubcategory(subcategory);
    } else {
      this.createSubcategory(subcategory);
    }
  }

  createSubcategory(subcategory) {
    return apiUtil.post({
      url: 'subcategories',
      body: { subcategory: subcategoryTransformer.transformToApi(subcategory) },
      onSuccess: response => this.storeSubcategory(subcategoryTransformer.transformFromApi(response.subcategory)),
    });
  }

  updateSubcategory(subcategory) {
    return apiUtil.put({
      url: `subcategories/${subcategory.id}`,
      body: { subcategory: subcategoryTransformer.transformToApi(subcategory) },
      onSuccess: response => this.storeSubcategory(subcategoryTransformer.transformFromApi(response.subcategory)),
    });
  }

  deleteSubcategory(subcategoryId) {
    store.dispatch({ type: 'DELETE_SUBCATEGORY' });
    return apiUtil.delete({
      url: `subcategories/${subcategoryId}`,
      onSuccess: () => this.removeSubcategory(subcategoryId),
    });
  }

  storeCategory = (category) => {
    store.dispatch({
      type: 'SET_CATEGORY',
      category,
    });
  };

  removeCategory = (categoryId) => {
    store.dispatch({
      type: 'REMOVE_CATEGORY',
      categoryId,
    });
  };

  storeSubcategory = (subcategory) => {
    store.dispatch({
      type: 'SET_SUBCATEGORY',
      subcategory,
    });
  };

  removeSubcategory = (subcategoryId) => {
    store.dispatch({
      type: 'REMOVE_SUBCATEGORY',
      subcategoryId,
    });
  };
}

export const GET_CATEGORIES = 'GET_CATEGORIES';
export function getCategories(options) {
  const categoriesLoaded = categoryDataLoaded(store.getState());

  if (categoriesLoaded && options && options.useStore) {
    return Promise.resolve();
  }

  store.dispatch({ type: 'GET_CATEGORIES' });

  return Promise.all([
    fetchCategoryTypes(),
    fetchCategories(),
    fetchSubcategories(),
  ]);
}

export function fetchCategoryTypes() {
  return apiUtil.get({
    url: 'category_type2',
    onSuccess: response => storeCategoryTypes(response.category_type2),
  });
}

export const SET_CATEGORY_TYPES = 'SET_CATEGORY_TYPES';
function storeCategoryTypes(categoryTypes) {
  store.dispatch({
    type: SET_CATEGORY_TYPES,
    categoryTypes,
  });
}

export function fetchCategories() {
  return apiUtil.get({
    url: 'categories',
    onSuccess: response => storeCategories(
      response.categories.map(category => categoryTransformer.transformFromApi(category))
    ),
  });
}

export const SET_CATEGORIES = 'SET_CATEGORIES';
function storeCategories(categories) {
  store.dispatch({
    type: SET_CATEGORIES,
    categories,
  });
}

export function fetchSubcategories() {
  return apiUtil.get({
    url: 'subcategories',
    onSuccess: response => storeSubcategories(
      response.subcategories.map(subcategory => subcategoryTransformer.transformFromApi(subcategory))
    ),
  });
}

export const SET_SUBCATEGORIES = 'SET_SUBCATEGORIES';
function storeSubcategories(subcategories) {
  store.dispatch({
    type: SET_SUBCATEGORIES,
    subcategories,
  });
}

export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export function setCurrentCategory(categoryId) {
  store.dispatch({ type: SET_CURRENT_CATEGORY, categoryId });
}

export const SET_CURRENT_SUBCATEGORY = 'SET_CURRENT_SUBCATEGORY';
export function setCurrentSubcategory(subcategoryId) {
  store.dispatch({ type: SET_CURRENT_SUBCATEGORY, subcategoryId });
}

export default new CategoryActions();
