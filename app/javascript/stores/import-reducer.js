import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  transactions: List(),
  fileName: null,
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case 'SET_OFX_TRANSACTIONS':
      return setOfxTransactions(state, action.transactions);
    case 'UPLOAD_OFX':
      return setFileName(state, action.fileName);
    case 'SET_NOTES':
      return setNotes(state, action.index, action.notes);
    case 'SET_CATEGORY_ID':
      return setCategoryId(state, action.index, action.categoryId);
    case 'SET_SUBCATEGORY_ID':
      return setSubcategoryId(state, action.index, action.subcategoryId);
    case 'SET_IMPORT':
      return setImport(state, action.index, action.import);
    default:
      return state;
  }
}

function setOfxTransactions(state, transactions) {
  return state.set('transactions', fromJS(transactions));
}

function setFileName(state, fileName) {
  return state.set('fileName', fileName);
}

function setNotes(state, index, notes) {
  return state.setIn(['transactions', index, 'notes'], notes);
}

function setCategoryId(state, index, categoryId) {
  return state.setIn(['transactions', index, 'categoryId'], categoryId)
              .setIn(['transactions', index, 'subcategoryId'], null);
}

function setSubcategoryId(state, index, subcategoryId) {
  return state.setIn(['transactions', index, 'subcategoryId'], subcategoryId);
}

function setImport(state, index, importFlag) {
  return state.setIn(['transactions', index, 'import'], importFlag);
}
