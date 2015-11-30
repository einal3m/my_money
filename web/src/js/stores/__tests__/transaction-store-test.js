import alt from '../../alt';
import transactionStore from '../transaction-store';
import transactionActions from '../../actions/transaction-actions';

describe('TransactionStore', () => {
  let transaction1, transaction2;
  beforeEach(() => {    
    transaction1 = {id: 11, name: 'account1', accountType: 'share'};
    transaction2 = {id: 12, name: 'account2', accountType: 'savings'};
  });

  afterEach(() => {
    alt.recycle();
  });

  it('has a default state', () => {
    expect(transactionStore.getState().transactions).toEqual([]);
    expect(transactionStore.getState().loading).toEqual(false);    
  });

  describe('onFetchTransactions', () => {
    it('sets loading to true and resets transactions array', () => {
      alt.dispatcher.dispatch({action: transactionActions.FETCH_TRANSACTIONS});

      expect(transactionStore.getState().transactions).toEqual([]);
      expect(transactionStore.getState().loading).toEqual(true);    
    });
  });

  describe('onReceiveTransactions', () => {
    let transactions;
    beforeEach(() => {
      transactions = [transaction1, transaction2];
    });

    it('sets loading to false and fills transactions array with transactions', () => {
      alt.dispatcher.dispatch({action: transactionActions.RECEIVE_TRANSACTIONS, data: transactions});

      expect(transactionStore.getState().transactions[0]).toEqual(transaction1);
      expect(transactionStore.getState().transactions[1]).toEqual(transaction2);
      expect(transactionStore.getState().loading).toEqual(false);    
    });
  });
});
