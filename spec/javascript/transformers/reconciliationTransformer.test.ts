import {
  transformFromApi,
  transformToApi,
} from 'transformers/reconciliationTransformer'

describe('ReconciliationTransformer', () => {
  describe('transformFromApi', () => {
    it('converts api response', () => {
      const apiReconciliation = {
        id: 1,
        account_id: 3,
        statement_balance: 1400,
        statement_date: '2017-03-14',
        reconciled: false,
      }

      expect(transformFromApi(apiReconciliation)).toEqual({
        id: 1,
        accountId: 3,
        statementBalance: 1400,
        statementDate: '2017-03-14',
        reconciled: false,
      })
    })
  })

  describe('transformToApi', () => {
    it('converts to api format', () => {
      const reconciliation = {
        id: 1,
        accountId: 3,
        statementBalance: 1400,
        statementDate: '2017-03-14',
        reconciled: false,
      }

      expect(transformToApi(reconciliation)).toEqual({
        id: 1,
        account_id: 3,
        statement_balance: 1400,
        statement_date: '2017-03-14',
        reconciled: false,
      })
    })
  })
})
