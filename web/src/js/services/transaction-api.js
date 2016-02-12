import transactionActions from '../actions/transaction-actions';
import importActions from '../actions/import-actions';
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

  uploadOFX(accountId, file) {
    let formData = new FormData();
    formData.append('data_file', file);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/accounts/' + accountId + '/transactions/ofx');

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        importActions.storeOfxTransactions(xhr.responseText);
      }
    }
    xhr.send(formData);
  }

  _send(params) {
    reqwest(params);
  }
}

export default new TransactionApi();
