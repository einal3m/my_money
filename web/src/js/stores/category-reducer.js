import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  loaded: false,
  categoryTypes: List()
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
  case 'SET_CATEGORY_TYPES':
    return setCategoryTypes(state, action.categoryTypes);
  }
  return state;
}

function setCategoryTypes(state, categoryTypes) {
  return state.set('categoryTypes', fromJS(categoryTypes))
              .set('editableCategoryTypes', editableCategoryTypes(categoryTypes))
              .set('loaded', true)
}

function editableCategoryTypes(categoryTypes) {
  return fromJS(categoryTypes).filter(categoryType => categoryType.get('editable'));
}