import transactionApi from '../transaction-api';
import transactionActions from '../../actions/transaction-actions';

describe('transactionApi', () => {
  beforeEach(function() {
    spyOn(transactionApi, '_send');
  });

  describe('list', () => {
    it('makes an ajax request to GET/accounts/transactions', () => {
      transactionApi.index(34, '2015-09-03', '2015-10-02');

      let requestParams = transactionApi._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts/34/transactions?from_date=2015-09-03&to_date=2015-10-02');
      expect(requestParams.method).toEqual('GET');

      spyOn(transactionActions, 'storeTransactions');
      requestParams.success({transactions: ['transactions']});
      expect(transactionActions.storeTransactions).toHaveBeenCalledWith(['transactions']);
    });
  });
});
