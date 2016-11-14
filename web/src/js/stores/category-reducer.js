import { Map, List, fromJS } from 'immutable';
import { SET_CURRENT_CATEGORY, SET_CURRENT_SUBCATEGORY } from '../actions/category-actions';

const INITIAL_STATE = Map({
  categoryTypesLoaded: false,
  categoriesLoaded: false,
  subcategoriesLoaded: false,
  categoryTypes: List(),
  categories: List(),
  subcategories: List(),
  currentCategoryId: null,
  currentSubcategoryId: null,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case 'SET_CATEGORY_TYPES':
      return setCategoryTypes(state, action.categoryTypes);
    case 'SET_CATEGORIES':
      return setCategories(state, action.categories);
    case 'SET_CATEGORY':
      return setCategory(state, action.category);
    case 'REMOVE_CATEGORY':
      return removeCategory(state, action.categoryId);
    case 'SET_SUBCATEGORIES':
      return setSubcategories(state, action.subcategories);
    case 'SET_SUBCATEGORY':
      return setSubcategory(state, action.subcategory);
    case 'REMOVE_SUBCATEGORY':
      return removeSubcategory(state, action.subcategoryId);
    case SET_CURRENT_CATEGORY:
      return setCurrentCategory(state, action.categoryId);
    case SET_CURRENT_SUBCATEGORY:
      return setCurrentSubcategory(state, action.subcategoryId);
    default:
      return state;
  }
}

function setCategoryTypes(state, categoryTypes) {
  return state.set('categoryTypes', fromJS(categoryTypes))
              .set('categoryTypesLoaded', true);
}

function setCategories(state, categories) {
  return state.set('categories', fromJS(categories))
              .set('categoriesLoaded', true);
}

function setSubcategories(state, subcategories) {
  return state.set('subcategories', fromJS(subcategories))
              .set('subcategoriesLoaded', true);
}

function addCategory(state, category) {
  return state.set('categories', state.get('categories').push(fromJS(category)));
}

function setCategory(state, newCategory) {
  const index = state.get('categories').findIndex(category => category.get('id') === newCategory.id);
  if (index < 0) {
    return addCategory(state, newCategory);
  }
  return state.set('categories', state.get('categories').update(index, () => fromJS(newCategory)));
}

function addSubcategory(state, subcategory) {
  return state.set('subcategories', state.get('subcategories').push(fromJS(subcategory)));
}

function setSubcategory(state, newSubcategory) {
  const index = state.get('subcategories').findIndex(subcategory => subcategory.get('id') === newSubcategory.id);
  if (index < 0) {
    return addSubcategory(state, newSubcategory);
  }
  return state.set('subcategories', state.get('subcategories').update(index, () => fromJS(newSubcategory)));
}

function removeCategory(state, categoryId) {
  const index = state.get('categories').findIndex(category => category.get('id') === categoryId);
  return state.set('categories', state.get('categories').delete(index));
}

function removeSubcategory(state, subcategoryId) {
  const index = state.get('subcategories').findIndex(subcategory => subcategory.get('id') === subcategoryId);
  return state.set('subcategories', state.get('subcategories').delete(index));
}

function setCurrentCategory(state, categoryId) {
  return state.set('currentCategoryId', categoryId);
}

function setCurrentSubcategory(state, subcategoryId) {
  return state.set('currentSubcategoryId', subcategoryId);
}
