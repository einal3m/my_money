import { Map, fromJS } from 'immutable';
import { SHOW_FORM_MODAL, HIDE_FORM_MODAL } from '../actions/form-actions';

const INITIAL_STATE = Map({
  show: false,
  modelType: null,
  model: Map({}),
  allowDelete: false,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case 'SHOW_FORM_MODAL':
      return showModal(state, action.modelType, action.model, action.allowDelete);
    case 'HIDE_FORM_MODAL':
      return hideModal(state);
    default:
      return state;
  }
}

function showModal(state, modelType, model, allowDelete) {
  return state.set('show', true)
    .set('modelType', modelType)
    .set('model', fromJS(model))
    .set('allowDelete', allowDelete);
}

function hideModal(state) {
  return state.set('show', false)
    .set('modelType', null)
    .set('model', Map({}));
}
