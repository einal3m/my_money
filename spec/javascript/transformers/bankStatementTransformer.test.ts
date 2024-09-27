import {
  transformFromApi,
  transformFromOfxApi,
} from 'transformers/bankStatementTransformer'

describe('BankStatementTranformer', () => {
  describe('transformFromApi', () => {
    it('converts bank statements from API format', () => {
      const bankStatementFromApi = {
        id: 11,
        account_id: 22,
        file_name: 'Filename.ofx',
        date: '2015-11-01',
        transaction_count: 4,
      }

      const transformedBankStatement = transformFromApi(bankStatementFromApi)

      expect(transformedBankStatement.id).toEqual(11)
      expect(transformedBankStatement.accountId).toEqual(22)
      expect(transformedBankStatement.fileName).toEqual('Filename.ofx')
      expect(transformedBankStatement.date).toEqual('2015-11-01')
      expect(transformedBankStatement.transactionCount).toEqual(4)
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
