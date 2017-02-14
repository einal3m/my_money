import { Map, List } from 'immutable';
import {
  GET_BANK_STATEMENTS,
  SET_BANK_STATEMENTS,
  CONFIRM_DELETE_BANK_STATEMENT,
  CANCEL_DELETE_BANK_STATEMENT,
  DELETE_BANK_STATEMENT,
} from '../actions/bank-statement-actions';

const INITIAL_STATE = Map({
  loaded: false,
  bankStatements: List(),
  bankStatementForDelete: null,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case GET_BANK_STATEMENTS:
      return state.set('loaded', false).set('bankStatements', List());
    case SET_BANK_STATEMENTS:
      return state.set('loaded', true).set('bankStatements', List(action.bankStatements));
    case CONFIRM_DELETE_BANK_STATEMENT:
      return state.set('bankStatementForDelete', Map(action.bankStatement));
    case CANCEL_DELETE_BANK_STATEMENT:
    case DELETE_BANK_STATEMENT:
      return state.set('bankStatementForDelete', null);
    default:
      return state;
  }
}
