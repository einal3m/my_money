import transactionActions from '../actions/transaction-actions';
import reqwest from 'reqwest';

class TransactionApi {
  index(accountId, fromDate, toDate) {
    this._send({
        url: 'http://localhost:3000/accounts/' + accountId + '/transactions?from_date=' + fromDate + '&to_date=' + toDate,
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'GET',
        success: function (response) {
          transactionActions.storeTransactions(
            response.transactions
          )
        }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new TransactionApi();
