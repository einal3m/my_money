import transactionActions from '../actions/transaction-actions';
import reqwest from 'reqwest';

class TransactionApi {
  index(accountId, fromDate, toDate, description) {
    let url = 'http://localhost:3000/accounts/' + accountId + '/transactions?from_date=' + fromDate + '&to_date=' + toDate;
    if (description) {
      url = `${url}&description=${description}`;
    }
    this._send({
        url: url,
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
