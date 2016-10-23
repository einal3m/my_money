import importActions from '../import-actions';
import transactionTransformer from '../../transformers/transaction-transformer';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';
import { hashHistory } from 'react-router';
import { fromJS } from 'immutable';

describe('ImportActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('uploadOFX', () => {
    it('calls the ofx api with the file and accountId', () => {
      const file = { name: 'file.ofx' };
      spyOn(apiUtil, 'upload');
      spyOn(hashHistory, 'push');

      importActions.uploadOFX(45, file);

      expect(apiUtil.upload).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'UPLOAD_OFX', fileName: 'file.ofx' });
      expect(hashHistory.push).toHaveBeenCalledWith('/import');

      const uploadArgs = apiUtil.upload.calls.argsFor(0)[0];
      expect(uploadArgs.url).toEqual('accounts/45/transactions/import');
      expect(uploadArgs.file).toEqual(file);

      spyOn(transactionTransformer, 'transformFromOfxApi').and.returnValue('transformedFromApi');
      spyOn(importActions, 'storeOfxTransactions');
      const successCallback = uploadArgs.onSuccess;
      successCallback({ transactions: ['transaction'] });

      expect(transactionTransformer.transformFromOfxApi).toHaveBeenCalledWith('transaction');
      expect(importActions.storeOfxTransactions).toHaveBeenCalledWith(['transformedFromApi']);
    });
  });

  describe('storeOfxTransactions', () => {
    it('dispatches the transactions to the store and changes to import route', () => {
      importActions.storeOfxTransactions(['transactions']);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_OFX_TRANSACTIONS',
        transactions: ['transactions'],
      });
    });
  });

  describe('import transactions', () => {
    it('calls the bank statement api to upload the transactions', () => {
      spyOn(apiUtil, 'post');
      spyOn(store, 'getState').and.returnValue({
        importStore: fromJS({
          transactions: [{ memo: 'one', import: false }, { memo: 'two', import: true }],
          fileName: 'file.ofx',
        }),
        accountStore: fromJS({ currentAccount: { id: 45 } }),
      });
      spyOn(transactionTransformer, 'transformToApi').and.returnValue('transaction');

      importActions.importTransactions();

      expect(apiUtil.post).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'SAVE_TRANSACTIONS' });
      expect(transactionTransformer.transformToApi).toHaveBeenCalledWith({ memo: 'two', import: true });

      const postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('accounts/45/bank_statements');
      expect(postArgs.body.account_id).toEqual(45);
      expect(postArgs.body.transactions).toEqual(['transaction']);
      expect(postArgs.body.file_name).toEqual('file.ofx');

      spyOn(importActions, 'importComplete');
      postArgs.onSuccess();
      expect(importActions.importComplete).toHaveBeenCalled();
    });
  });

  describe('importComplete', () => {
    it('dispatches an empty array to the store, and changes route', () => {
      spyOn(hashHistory, 'push');
      importActions.importComplete();

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_OFX_TRANSACTIONS',
        transactions: [],
      });
      expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
    });
  });

  describe('updating ofx transactions', () => {
    it('setNotes dispatches note to the store', () => {
      importActions.setNotes(3, 'newNote');

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_NOTES',
        index: 3,
        notes: 'newNote',
      });
    });

    it('setCategoryId dispatches category id to the store', () => {
      importActions.setCategoryId(4, 34);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_CATEGORY_ID',
        index: 4,
        categoryId: 34,
      });
    });

    it('setSubcategoryId dispatches subcategory id to the store', () => {
      importActions.setSubcategoryId(5, 27);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_SUBCATEGORY_ID',
        index: 5,
        subcategoryId: 27,
      });
    });

    it('setImport dispatches import flag to the store', () => {
      importActions.setImport(6, true);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_IMPORT',
        index: 6,
        import: true,
      });
    });
  });
});
