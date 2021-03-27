import { Map, List, fromJS } from 'immutable';
import {
  GET_PATTERNS,
  SET_PATTERNS,
} from '../actions/pattern-actions';

const INITIAL_STATE = Map({
  loaded: false,
  patterns: List([]),
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case GET_PATTERNS:
      return getPatterns(state);
    case SET_PATTERNS:
      return setPatterns(state, action.patterns);
    default:
      return state;
  }
}

function setPatterns(state, patterns) {
  return state.set('loaded', true)
    .set('patterns', fromJS(patterns));
}

function getPatterns(state) {
  return state.set('loaded', false);
}
