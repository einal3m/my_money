import { fromJS } from 'immutable';
import * as bankStatementActions from '../bank-statement-actions';
import bankStatementTransformer from '../../transformers/bank-statement-transformer';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';

describe('BankStatementActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('fetchBankStatements', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({ currentAccount: { id: 22 } }),
      });
    });

    it('calls the bank_statements api', () => {
      bankStatementActions.fetchBankStatements();

      expect(dispatcherSpy).toHaveBeenCalledWith({ type: bankStatementActions.GET_BANK_STATEMENTS });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts/22/bank_statements');
    });

    it('saves the import history to the store on success', () => {
      bankStatementActions.fetchBankStatements();

      spyOn(bankStatementTransformer, 'transformFromApi').and.returnValue('transformedBankStatement');
      const getArgs = apiUtil.get.calls.argsFor(0)[0];

      getArgs.onSuccess({ bank_statements: ['bankStatement'] });

      expect(bankStatementTransformer.transformFromApi).toHaveBeenCalledWith('bankStatement');
      expect(dispatcherSpy).toHaveBeenCalledWith(
        { type: bankStatementActions.SET_BANK_STATEMENTS, bankStatements: ['transformedBankStatement'] }
      );
    });
  });
});
