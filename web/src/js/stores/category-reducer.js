import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  categoryTypesLoaded: false,
  categoriesLoaded: false,
  subcategoriesLoaded: false,
  categoryTypes: List(),
  categories: List(),
  subcategories: List()
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
  case 'SET_CATEGORY_TYPES':
    return setCategoryTypes(state, action.categoryTypes);
  case 'SET_CATEGORIES':
    return setCategories(state, action.categories);
  case 'SET_SUBCATEGORIES':
    return setSubcategories(state, action.subcategories);
  case 'SET_CATEGORY':
    return setCategory(state, action.category);
  case 'SET_SUBCATEGORY':
    return setSubcategory(state, action.subcategory);
  }
  return state;
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
  console.log('setCategory');
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
