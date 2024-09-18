import {
  transformFromApi,
  transformToApi,
  transformFromOfxApi,
} from 'transformers/transactionTransformer'

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
        matchingTransactionId: 45,
        transactionType: 'bank_transaction',
      }

      const transformedTransaction = transformToApi(transaction)

      expect(transformedTransaction.id).toEqual(34)
      expect(transformedTransaction.account_id).toEqual(12)
      expect(transformedTransaction.date).toEqual('2015-04-13')
      expect(transformedTransaction.amount).toEqual(450)
      expect(transformedTransaction.category_id).toEqual(3)
      expect(transformedTransaction.subcategory_id).toEqual(11)
      expect(transformedTransaction.notes).toEqual('a note')
      expect(transformedTransaction.memo).toEqual('a memo')
      expect(transformedTransaction.matching_transaction_id).toEqual(45)
      expect(transformedTransaction.transaction_type).toEqual(
        'bank_transaction',
      )
    })
  })

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
        matching_transaction: {
          id: 45,
          account_id: 13,
          memo: 'matching meme',
          notes: 'matching notes',
        },
        transaction_type: 'bank_transaction',
      }

      const transformedTransaction = transformFromApi(transaction)

      expect(transformedTransaction.id).toEqual(34)
      expect(transformedTransaction.accountId).toEqual(12)
      expect(transformedTransaction.date).toEqual('2015-04-13')
      expect(transformedTransaction.amount).toEqual(450)
      expect(transformedTransaction.categoryId).toEqual(3)
      expect(transformedTransaction.subcategoryId).toEqual(11)
      expect(transformedTransaction.notes).toEqual('a note')
      expect(transformedTransaction.memo).toEqual('a memo')
      expect(transformedTransaction.balance).toEqual(3000)
      expect(transformedTransaction.matchingTransactionId).toEqual(45)
      expect(transformedTransaction.matchingTransaction).toEqual({
        id: 45,
        accountId: 13,
        memo: 'matching meme',
        notes: 'matching notes',
      })
      expect(transformedTransaction.transactionType).toEqual('bank_transaction')
    })
  })

  describe('transformFromOfxApi', () => {
    it('converts transaction from ofx API', () => {
      const transaction = {
        account_id: 12,
        date: '2015-04-13',
        amount: 450,
        memo: 'myMemo',
        category_id: 3,
        subcategory_id: 11,
        notes: undefined,
        import: false,
        duplicate: true,
      }

      const transformedTransaction = transformFromOfxApi(transaction)

      expect(transformedTransaction.accountId).toEqual(12)
      expect(transformedTransaction.date).toEqual('2015-04-13')
      expect(transformedTransaction.amount).toEqual(450)
      expect(transformedTransaction.memo).toEqual('myMemo')
      expect(transformedTransaction.categoryId).toEqual(3)
      expect(transformedTransaction.subcategoryId).toEqual(11)
      expect(transformedTransaction.notes).toEqual(undefined)
      expect(transformedTransaction.import).toEqual(false)
      expect(transformedTransaction.duplicate).toEqual(true)
    })
  })
})
