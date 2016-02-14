import transactionTransformer from '../transformers/transaction-transformer';
import importActions from '../actions/import-actions';
class BankStatementApi {

  create(accountId, fileName, transactions) {

    let transformedTxns = transactions.map(transaction => transactionTransformer.transformToApi(transaction));

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/accounts/' + accountId + '/bank_statements');
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 201) {
        importActions.importComplete();
        console.log(xhr.responseText);
      }
    }
    xhr.send(JSON.stringify({account_id: accountId, file_name: fileName, transactions: transformedTxns}));
  }
}

export default new BankStatementApi();


// function get(url) {
//   // Return a new promise.
//   return new Promise(function(resolve, reject) {
//     // Do the usual XHR stuff
//     var req = new XMLHttpRequest();
//     req.open('GET', url);

//     req.onload = function() {
//       // This is called even on 404 etc
//       // so check the status
//       if (req.status == 200) {
//         // Resolve the promise with the response text
//         resolve(req.response);
//       }
//       else {
//         // Otherwise reject with the status text
//         // which will hopefully be a meaningful error
//         reject(Error(req.statusText));
//       }
//     };

//     // Handle network errors
//     req.onerror = function() {
//       reject(Error("Network Error"));
//     };

//     // Make the request
//     req.send();
//   });
// }