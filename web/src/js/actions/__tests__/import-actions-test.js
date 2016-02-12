import importActions from '../import-actions';
import transactionApi from '../../services/transaction-api';
import store from '../../stores/store';
import { hashHistory } from 'react-router';

describe('ImportActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('uploadOFX', () => {
    it('calls the ofx api with the file and accountId', () => {
      spyOn(transactionApi, 'uploadOFX');
      importActions.uploadOFX(45, 'file');
      expect(transactionApi.uploadOFX).toHaveBeenCalledWith(45, 'file');
    });
  });

  describe('storeOfxTransactions', () => {
    it('dispatches the transactions to the store and changes to import route', () => {
      spyOn(hashHistory, 'push');
      importActions.storeOfxTransactions(['transactions']);

      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_OFX_TRANSACTIONS',
        transactions: ['transactions']
      });
      expect(hashHistory.push).toHaveBeenCalledWith('/import');
    });
  });
});
