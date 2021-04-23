import { fromJS } from 'immutable';
import * as bankStatementActions from 'actions/bank-statement-actions';
import {
  GET_BANK_STATEMENTS,
  SET_BANK_STATEMENTS,
  CONFIRM_DELETE_BANK_STATEMENT,
  CANCEL_DELETE_BANK_STATEMENT,
  DELETE_BANK_STATEMENT,
} from 'actions/action-types';
import bankStatementTransformer from 'transformers/bank-statement-transformer';
import apiUtil from 'util/api-util';
import store from 'stores/store';

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

      expect(dispatcherSpy).toHaveBeenCalledWith({ type: GET_BANK_STATEMENTS });

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
        { type: SET_BANK_STATEMENTS, bankStatements: ['transformedBankStatement'] }
      );
    });
  });

  describe('delete modal', () => {
    it('confirmDeleteBankStatement dispatches id to the store', () => {
      bankStatementActions.confirmDeleteBankStatement({ id: 123 });
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: CONFIRM_DELETE_BANK_STATEMENT,
        bankStatement: { id: 123 },
      });
    });

    it('cancelDeleteBankStatement dispatches action to the store', () => {
      bankStatementActions.cancelDeleteBankStatement();
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: CANCEL_DELETE_BANK_STATEMENT,
      });
    });
  });

  describe('deleteBankStatement', () => {
    const bankStatement = { id: 23, accountId: 4 };
    beforeEach(() => {
      spyOn(apiUtil, 'delete');
      bankStatementActions.deleteBankStatement(bankStatement);
    });

    it('makes delete request', () => {
      expect(apiUtil.delete).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: DELETE_BANK_STATEMENT });

      const deleteArgs = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('accounts/4/bank_statements/23');
    });

    it('onSuccess, calls fetchBankStatements', () => {
      const deleteArgs = apiUtil.delete.calls.argsFor(0)[0];

      expect(deleteArgs.onSuccess).toEqual(bankStatementActions.fetchBankStatements);
    });
  });
});
