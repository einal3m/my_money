import { Map } from 'immutable';
import reconciliationReducer from 'stores/reconciliation-reducer';
import {
  SET_RECONCILIATIONS,
  GET_RECONCILIATIONS,
} from 'actions/reconciliation-actions';

describe('ReconciliationReducer', () => {
  const reconciliation = { id: 1, accountId: 3, statementBalance: 140, statementDate: '2017-03-14', reconciled: false };

  it('has a default state', () => {
    const state = reconciliationReducer();
    expect(state.get('loaded')).toEqual(false);
    expect(state.get('reconciliations').toJS()).toEqual([]);
  });

  describe('SET_RECONCILIATIONS', () => {
    it('stores the given reconciliations into the store', () => {
      const action = { type: SET_RECONCILIATIONS, reconciliations: [reconciliation] };
      const nextState = reconciliationReducer(undefined, action);

      expect(nextState.get('reconciliations').toJS()).toEqual([reconciliation]);
      expect(nextState.get('loaded')).toEqual(true);
    });
  });

  describe('GET_RECONCILIATIONS', () => {
    it('sets loaded to false', () => {
      const action = { type: GET_RECONCILIATIONS };
      const nextState = reconciliationReducer(Map({ loaded: true }), action);

      expect(nextState.get('loaded')).toEqual(false);
    });
  });
});
