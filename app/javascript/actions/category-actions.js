import store from '../stores/store';
import apiUtil from '../util/api-util';
import categoryTransformer from '../transformers/categoryTransformer';
import subcategoryTransformer from '../transformers/subcategoryTransformer';
import { categoryDataLoaded } from '../selectors/category-selector';
import {
  SET_CURRENT_CATEGORY,
  SET_CURRENT_SUBCATEGORY,
  SET_CATEGORY_TYPES,
  GET_CATEGORIES,
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
} from 'actions/action-types';

export function getCategories(options) {
  const categoriesLoaded = categoryDataLoaded(store.getState());

  if (categoriesLoaded && options && options.useStore) {
    return Promise.resolve();
  }

  store.dispatch({ type: GET_CATEGORIES });

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

export function storeCategoryTypes(categoryTypes) {
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

export function storeCategories(categories) {
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

export function storeSubcategories(subcategories) {
  store.dispatch({
    type: SET_SUBCATEGORIES,
    subcategories,
  });
}

export function setCurrentCategory(categoryId) {
  store.dispatch({ type: SET_CURRENT_CATEGORY, categoryId });
}

export function setCurrentSubcategory(subcategoryId) {
  store.dispatch({ type: SET_CURRENT_SUBCATEGORY, subcategoryId });
}
