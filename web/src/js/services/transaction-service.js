import TransactionActions from '../actions/transaction-actions';
import reqwest from 'reqwest';
// import accountTransformer from '../transformers/account-transformer';

class TransactionService {
  list(accountId) {
    console.log(accountId);
    this._send({
        url: 'http://localhost:3000/accounts/' + accountId + '/transactions',
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        method: 'GET',
        success: function (response) {
          TransactionActions.listTransactions(
            response.transactions
            // response.accounts.map((account) => {
            //   return accountTransformer.transformFromApi(account);
            // })
          )
        }
    });
  }

  _send(params) {
    reqwest(params);
  }
}

export default new TransactionService();
