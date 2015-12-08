import transactionTransformer from '../transaction-transformer';

describe('transactionTransformer', () => {
  describe('transformToApi', () => {
    it('converts transaction to API format', () => {
      let transaction = {
        id: 34,
        accountId: 12,
        date: '2015-04-13',
        amount: 450,
        categoryId: 3,
        subcategoryId: 11,
        notes: 'a note'
      }

      let transformedTransaction = transactionTransformer.transformToApi(transaction);

      expect(transformedTransaction.id).toEqual(34);
      expect(transformedTransaction.account_id).toEqual(12);
      expect(transformedTransaction.date).toEqual('2015-04-13');
      expect(transformedTransaction.amount).toEqual(450);
      expect(transformedTransaction.category_id).toEqual(3);
      expect(transformedTransaction.subcategory_id).toEqual(11);      
      expect(transformedTransaction.notes).toEqual('a note');      
    });
  });

  describe('transformFromApi', () => {
    it('converts transaction from API format', () => {
      let transaction = {
        id: 34,
        account_id: 12,
        date: '2015-04-13',
        amount: 450,
        category_id: 3,
        subcategory_id: 11,
        notes: 'a note'
      }

      let transformedTransaction = transactionTransformer.transformFromApi(transaction);

      expect(transformedTransaction.id).toEqual(34);
      expect(transformedTransaction.accountId).toEqual(12);
      expect(transformedTransaction.date).toEqual('2015-04-13');
      expect(transformedTransaction.amount).toEqual(450);
      expect(transformedTransaction.categoryId).toEqual(3);
      expect(transformedTransaction.subcategoryId).toEqual(11);      
      expect(transformedTransaction.notes).toEqual('a note');      
    });
  });
});
