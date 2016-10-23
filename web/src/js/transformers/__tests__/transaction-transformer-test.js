import transactionTransformer from '../transaction-transformer';

describe('transactionTransformer', () => {
  describe('transformToApi', () => {
    it('converts transaction to API format', () => {
      const transaction = {
        id: 34,
        accountId: 12,
        date: '2015-04-13',
        amount: 450,
        categoryId: 3,
        subcategoryId: 11,
        notes: 'a note',
        memo: 'a memo',
      };

      const transformedTransaction = transactionTransformer.transformToApi(transaction);

      expect(transformedTransaction.id).toEqual(34);
      expect(transformedTransaction.account_id).toEqual(12);
      expect(transformedTransaction.date).toEqual('2015-04-13');
      expect(transformedTransaction.amount).toEqual(450);
      expect(transformedTransaction.category_id).toEqual(3);
      expect(transformedTransaction.subcategory_id).toEqual(11);
      expect(transformedTransaction.notes).toEqual('a note');
      expect(transformedTransaction.memo).toEqual('a memo');
    });
  });

  describe('transformFromApi', () => {
    it('converts transaction from API format', () => {
      const transaction = {
        id: 34,
        account_id: 12,
        date: '2015-04-13',
        amount: 450,
        category_id: 3,
        subcategory_id: 11,
        notes: 'a note',
        memo: 'a memo',
        balance: 3000,
      };

      const transformedTransaction = transactionTransformer.transformFromApi(transaction);

      expect(transformedTransaction.id).toEqual(34);
      expect(transformedTransaction.accountId).toEqual(12);
      expect(transformedTransaction.date).toEqual('2015-04-13');
      expect(transformedTransaction.amount).toEqual(450);
      expect(transformedTransaction.categoryId).toEqual(3);
      expect(transformedTransaction.subcategoryId).toEqual(11);
      expect(transformedTransaction.notes).toEqual('a note');
      expect(transformedTransaction.memo).toEqual('a memo');
      expect(transformedTransaction.balance).toEqual(3000);
    });
  });

  describe('transformFromOfxApi', () => {
    it('converts transaction from ofx API', () => {
      const transaction = {
        account_id: 12,
        date: '2015-04-13',
        amount: 450,
        memo: 'myMemo',
        category_id: 3,
        subcategory_id: 11,
        notes: null,
        import: false,
        duplicate: true,
      };

      const transformedTransaction = transactionTransformer.transformFromOfxApi(transaction);

      expect(transformedTransaction.accountId).toEqual(12);
      expect(transformedTransaction.date).toEqual('2015-04-13');
      expect(transformedTransaction.amount).toEqual(450);
      expect(transformedTransaction.memo).toEqual('myMemo');
      expect(transformedTransaction.categoryId).toEqual(3);
      expect(transformedTransaction.subcategoryId).toEqual(11);
      expect(transformedTransaction.notes).toEqual(null);
      expect(transformedTransaction.import).toEqual(false);
      expect(transformedTransaction.duplicate).toEqual(true);
    });
  });
});
