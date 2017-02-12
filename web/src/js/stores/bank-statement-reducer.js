import { Map, List, fromJS } from 'immutable';
import { GET_BANK_STATEMENTS, SET_BANK_STATEMENTS } from '../actions/import-actions';

const INITIAL_STATE = Map({
  loaded: false,
  bankStatements: List(),
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case GET_BANK_STATEMENTS:
      return state.set('loaded', false).set('bankStatements', List());
    case SET_BANK_STATEMENTS:
      return state.set('loaded', true).set('bankStatements', List(action.bankStatements));
    default:
      return state;
  }
}
