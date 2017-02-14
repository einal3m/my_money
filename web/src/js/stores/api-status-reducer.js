import { Map } from 'immutable';
import ApiStatus from '../util/api-status';
import {
  GET_TRANSACTIONS,
  SET_TRANSACTIONS,
  SAVE_TRANSACTION,
  DELETE_TRANSACTION } from '../actions/transaction-actions';
import {
  GET_ACCOUNTS,
  SET_ACCOUNTS,
  SAVE_ACCOUNT,
  DELETE_ACCOUNT } from '../actions/account-actions';

import { GET_DATE_RANGES, SET_DATE_RANGES } from '../actions/date-range-actions';

import { UPLOAD_OFX, SET_OFX_TRANSACTIONS } from '../actions/import-actions';

import {
  GET_BANK_STATEMENTS,
  SET_BANK_STATEMENTS,
  CONFIRM_DELETE_BANK_STATEMENT,
  CANCEL_DELETE_BANK_STATEMENT,
  DELETE_BANK_STATEMENT,
} from '../actions/bank-statement-actions';

const INITIAL_STATE = Map({
  status: ApiStatus.DONE,
  message: null,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case GET_ACCOUNTS:
    case GET_DATE_RANGES:
    case GET_TRANSACTIONS:
    case 'GET_CATEGORIES':
    case 'GET_REPORT':
    case UPLOAD_OFX:
    case GET_BANK_STATEMENTS:
      return setLoading(state);

    case SET_ACCOUNTS:
    case SET_TRANSACTIONS:
    case SET_DATE_RANGES:
    case 'CLEAR_API_ERROR':
    case 'SET_CATEGORY_TYPES':
    case 'SET_CATEGORIES':
    case 'SET_SUBCATEGORIES':
    case 'SET_CATEGORY':
    case 'SET_SUBCATEGORY':
    case 'REMOVE_CATEGORY':
    case 'REMOVE_SUBCATEGORY':
    case SET_OFX_TRANSACTIONS:
    case SET_BANK_STATEMENTS:
    case 'SET_ACCOUNT_BALANCE_REPORT':
      return setDone(state);

    case SAVE_ACCOUNT:
    case SAVE_TRANSACTION:
    case 'SAVE_CATEGORY':
    case 'SAVE_SUBCATEGORY':
      return setSaving(state);

    case DELETE_ACCOUNT:
    case DELETE_TRANSACTION:
    case 'DELETE_CATEGORY':
    case 'DELETE_SUBCATEGORY':
    case DELETE_BANK_STATEMENT:
      return setDeleting(state);

    case 'SET_API_ERROR':
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
