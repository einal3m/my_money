import { fromJS } from 'immutable';
import * as importActions from '../import-actions';
import transactionTransformer from '../../transformers/transaction-transformer';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';
import * as routingActions from '../routing-actions';

describe('ImportActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('uploadOFX', () => {
    const file = { name: 'file.ofx' };
    beforeEach(() => {
      spyOn(apiUtil, 'upload');
      spyOn(routingActions, 'routeToImportTransactions');
    });

    it('calls the ofx api with the file and accountId', () => {
      importActions.uploadOFX(45, file);

      expect(apiUtil.upload).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: importActions.UPLOAD_OFX, fileName: 'file.ofx' });
      expect(routingActions.routeToImportTransactions).toHaveBeenCalled();

      const uploadArgs = apiUtil.upload.calls.argsFor(0)[0];
      expect(uploadArgs.url).toEqual('accounts/45/transactions/import');
      expect(uploadArgs.file).toEqual(file);
    });

    it('success callback dispatches transactions to the store', () => {
      importActions.uploadOFX(45, file);

      spyOn(transactionTransformer, 'transformFromOfxApi').and.returnValue('transformedFromApi');
      const uploadArgs = apiUtil.upload.calls.argsFor(0)[0];

      uploadArgs.onSuccess({ transactions: ['transaction'] });

      expect(transactionTransformer.transformFromOfxApi).toHaveBeenCalledWith('transaction');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: importActions.SET_OFX_TRANSACTIONS,
        transactions: ['transformedFromApi'],
      });
    });
  });

  describe('import transactions', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'post');
      spyOn(store, 'getState').and.returnValue({
        importStore: fromJS({
          transactions: [{ memo: 'one', import: false }, { memo: 'two', import: true }],
          fileName: 'file.ofx',
        }),
        accountStore: fromJS({ currentAccount: { id: 45 } }),
      });
      spyOn(transactionTransformer, 'transformToApi').and.returnValue('transaction');
    });

    it('calls the bank statement api to upload the transactions', () => {
      importActions.importTransactions();

      expect(apiUtil.post).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: importActions.SAVE_TRANSACTIONS });
      expect(transactionTransformer.transformToApi).toHaveBeenCalledWith({ memo: 'two', import: true });

      const postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('accounts/45/bank_statements');
      expect(postArgs.body.account_id).toEqual(45);
      expect(postArgs.body.transactions).toEqual(['transaction']);
      expect(postArgs.body.file_name).toEqual('file.ofx');
    });

    it('success callback dispatches an empty array to store', () => {
      spyOn(routingActions, 'routeToTransactions');

      importActions.importTransactions();
      const postArgs = apiUtil.post.calls.argsFor(0)[0];

      postArgs.onSuccess();

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: importActions.SET_OFX_TRANSACTIONS,
        transactions: [],
      });
      expect(routingActions.routeToTransactions).toHaveBeenCalled();
    });
  });

  describe('updating ofx transactions', () => {
    it('setNotes dispatches note to the store', () => {
      importActions.setNotes(3, 'newNote');

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: importActions.SET_NOTES,
        index: 3,
        notes: 'newNote',
      });
    });

    it('setCategoryId dispatches category id to the store', () => {
      importActions.setCategoryId(4, 34);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: importActions.SET_CATEGORY_ID,
        index: 4,
        categoryId: 34,
      });
    });

    it('setSubcategoryId dispatches subcategory id to the store', () => {
      importActions.setSubcategoryId(5, 27);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: importActions.SET_SUBCATEGORY_ID,
        index: 5,
        subcategoryId: 27,
      });
    });

    it('setImport dispatches import flag to the store', () => {
      importActions.setImport(6, true);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: importActions.SET_IMPORT,
        index: 6,
        import: true,
      });
    });
  });
});
