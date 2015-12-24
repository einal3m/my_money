import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  loaded: false,
  categoryTypes: List(),
  categories: List(),
  categoriesByType: Map()
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
  case 'SET_CATEGORY_TYPES':
    return setCategoryTypes(state, action.categoryTypes);
  case 'SET_CATEGORIES':
    return setCategories(state, action.categories);
  case 'ADD_CATEGORY':
    return addCategory(state, action.category);
  }
  return state;
}

function setCategoryTypes(state, categoryTypes) {
  return state.set('categoryTypes', fromJS(categoryTypes))
              .set('editableCategoryTypes', editableCategoryTypes(categoryTypes))
              .set('loaded', true)
              .set('categoriesByType', categoriesByType(fromJS(categoryTypes), state.get('categories')));
}

function editableCategoryTypes(categoryTypes) {
  return fromJS(categoryTypes).filter(categoryType => categoryType.get('editable'));
}

function categoriesByType(categoryTypes, categories) {
  let categoryGroups = categories.groupBy(category => category.get('categoryTypeId'));

  let groups = {};
  categoryTypes.forEach(categoryType => {
    let categoriesForType = categoryGroups.get(categoryType.get('id'));
    if (categoriesForType) {
      groups[categoryType.get('code')] = categoriesForType;
    }
  });
  return fromJS(groups);
}

function setCategories(state, categories) {
  return state.set('categories', fromJS(categories))
              .set('categoriesByType', categoriesByType(state.get('categoryTypes'), fromJS(categories)));
}

function addCategory(state, category) {
  const categories = state.get('categories').push(fromJS(category));
  return state.set('categories', categories)
              .set('categoriesByType', categoriesByType(state.get('categoryTypes'), fromJS(categories)));
}
