import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  loaded: false,
  dateRanges: List(),
  currentDateRange: null
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
  case 'SET_DATE_RANGES':
    return setDateRanges(state, action.dateRanges);
  case 'SET_CURRENT_DATE_RANGE':
    return setCurrentDateRange(state, action.id);
  case 'UPDATE_CURRENT_DATE_RANGE':
    return updateCurrentDateRange(state, action.dateChange);
  }
  return state;
}

function setDateRanges(state, dateRanges) {
  return state.set('dateRanges', fromJS(dateRanges))
              .set('loaded', true)
              .set('currentDateRange', defaultDateRange(dateRanges));
}

function setCurrentDateRange(state, id) {
  return state.set('currentDateRange', state.get('dateRanges').find(dateRange => dateRange.get('id') === id));
}

function updateCurrentDateRange(state, dateChange) {
  if (dateChange.fromDate) {
    return state.setIn(['currentDateRange', 'fromDate'], dateChange.fromDate);
  } else if (dateChange.toDate) {
    return state.setIn(['currentDateRange', 'toDate'], dateChange.toDate);
  }
  return state;
}

function defaultDateRange(dateRanges) {
  return fromJS(dateRanges).find(dateRange => dateRange.get('default'));
}
