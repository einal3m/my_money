import { Map, List, fromJS } from 'immutable';
import {
  GET_BUDGETS,
  SET_BUDGETS,
} from '../actions/budget-actions';

const INITIAL_STATE = Map({
  loaded: false,
  budgets: List([]),
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case GET_BUDGETS:
      return state.set('loaded', false).set('budgets', List());
    case SET_BUDGETS:
      return state.set('loaded', true).set('budgets', List(action.budgets));
    default:
      return state;
  }
}
