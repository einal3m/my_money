import { Map } from 'immutable';
import ApiStatus from '../util/api-status';
import {
  GET_ACCOUNTS,
  SET_ACCOUNTS,
  SAVE_ACCOUNT,
  DELETE_ACCOUNT,
  GET_TRANSACTIONS,
  SET_TRANSACTIONS,
  SAVE_TRANSACTION,
  DELETE_TRANSACTION ,
  GET_DATE_RANGES,
  SET_DATE_RANGES,
  UPLOAD_OFX,
  SET_OFX_TRANSACTIONS,
  GET_BANK_STATEMENTS,
  SET_BANK_STATEMENTS,
  DELETE_BANK_STATEMENT,
  GET_REPORT,
  SET_ACCOUNT_BALANCE_REPORT,
  SET_INCOME_VS_EXPENSE,
  SET_TRANSACTION_REPORT,
  SET_TOTALS_REPORT,
  GET_CATEGORIES,
  SET_CATEGORY_TYPES,
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
  SAVE_CATEGORY,
  DELETE_CATEGORY,
  REMOVE_CATEGORY,
  SAVE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  SET_CATEGORY,
  SET_SUBCATEGORY,
  REMOVE_SUBCATEGORY,
  SET_LOAN_REPORT,
  GET_BUDGETS,
  SET_BUDGETS,
  GET_RECONCILIATIONS,
  SET_RECONCILIATIONS,
  SAVE_RECONCILIATION,
  SET_API_ERROR,
  CLEAR_API_ERROR,
} from 'actions/action-types';

const INITIAL_STATE = Map({
  status: ApiStatus.DONE,
  message: null,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case GET_ACCOUNTS:
    case GET_DATE_RANGES:
    case GET_TRANSACTIONS:
    case GET_CATEGORIES:
    case GET_REPORT:
    case UPLOAD_OFX:
    case GET_BANK_STATEMENTS:
    case GET_BUDGETS:
    case GET_RECONCILIATIONS:
      return setLoading(state);

    case SET_ACCOUNTS:
    case SET_TRANSACTIONS:
    case SET_DATE_RANGES:
    case CLEAR_API_ERROR:
    case SET_CATEGORY_TYPES:
    case SET_CATEGORIES:
    case SET_SUBCATEGORIES:
    case SET_CATEGORY:
    case SET_SUBCATEGORY:
    case REMOVE_CATEGORY:
    case REMOVE_SUBCATEGORY:
    case SET_OFX_TRANSACTIONS:
    case SET_BANK_STATEMENTS:
    case SET_ACCOUNT_BALANCE_REPORT:
    case SET_INCOME_VS_EXPENSE:
    case SET_TRANSACTION_REPORT:
    case SET_TOTALS_REPORT:
    case SET_LOAN_REPORT:
    case SET_BUDGETS:
    case SET_RECONCILIATIONS:
      return setDone(state);

    case SAVE_ACCOUNT:
    case SAVE_TRANSACTION:
    case SAVE_CATEGORY:
    case SAVE_SUBCATEGORY:
    case SAVE_RECONCILIATION:
      return setSaving(state);

    case DELETE_ACCOUNT:
    case DELETE_TRANSACTION:
    case DELETE_CATEGORY:
    case DELETE_SUBCATEGORY:
    case DELETE_BANK_STATEMENT:
      return setDeleting(state);

    case SET_API_ERROR:
      return setError(state, action.message);

    default:
      return state;
  }
}

function setDone(state) {
  return state.set('status', ApiStatus.DONE).set('message', null);
}

function setLoading(state) {
  return state.set('status', ApiStatus.LOADING).set('message', null);
}

function setSaving(state) {
  return state.set('status', ApiStatus.SAVING).set('message', null);
}

function setDeleting(state) {
  return state.set('status', ApiStatus.DELETING).set('message', null);
}

function setError(state, message) {
  return state.set('status', ApiStatus.ERROR).set('message', message);
}
