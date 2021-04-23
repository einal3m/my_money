import { fromJS } from 'immutable';
import budgetReducer from 'stores/budget-reducer';
import {
  SET_BUDGETS,
  GET_BUDGETS,
} from 'actions/action-types';

describe('PatternReducer', () => {
  it('has a default state', () => {
    const state = budgetReducer();
    expect(state.get('loaded')).toEqual(false);
    expect(state.get('budgets').toJS()).toEqual([]);
  });

  describe('GET_BUDGETS', () => {
    it('sets loading to false and budgets to empty', () => {
      const action = { type: GET_BUDGETS };
      const state = budgetReducer(fromJS({ loaded: true, budgets: ['budget'] }), action);

      expect(state.get('loaded')).toEqual(false);
      expect(state.get('budgets').toJS()).toEqual([]);
    });
  });

  describe('SET_BUDGETS', () => {
    it('sets loaded to true and budgets list', () => {
      const action = { type: SET_BUDGETS, budgets: ['budget'] };
      const state = budgetReducer(undefined, action);

      expect(state.get('loaded')).toEqual(true);
      expect(state.get('budgets').toJS()).toEqual(['budget']);
    });
  });
});
