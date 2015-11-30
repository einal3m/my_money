import transactionService from '../transaction-service';
// import transactionTransformer from '../../transformers/account-transformer';
import transactionActions from '../../actions/transaction-actions';

describe('TransactionService', () => {
  beforeEach(function() {
    spyOn(transactionService, '_send');
  });

  describe('list', () => {
    it('makes an ajax request to GET/accounts/transactions', () => {
      transactionService.list(34, '2015-09-03', '2015-10-02');

      let requestParams = transactionService._send.calls.argsFor(0)[0];
      expect(requestParams.url).toEqual('http://localhost:3000/accounts/34/transactions?fromDate=2015-09-03&toDate=2015-10-02');
      expect(requestParams.method).toEqual('GET');

      spyOn(transactionActions, 'receiveTransactions');
      // spyOn(accountTransformer, 'transformFromApi').and.returnValue('transformedFromApi');
      requestParams.success({transactions: ['transactions']});
      // expect(accountTransformer.transformFromApi).toHaveBeenCalledWith('account');
      expect(transactionActions.receiveTransactions).toHaveBeenCalledWith(['transactions']);
    });
  });
});
