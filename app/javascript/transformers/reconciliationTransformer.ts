import { Reconciliation } from 'types/models'
import { ReconciliationRequest, ReconciliationResponse } from 'types/api'

export const transformFromApi = (
  reconciliation: ReconciliationResponse,
): Reconciliation => {
  return {
    id: reconciliation.id,
    accountId: reconciliation.account_id,
    statementBalance: reconciliation.statement_balance,
    statementDate: reconciliation.statement_date,
    reconciled: reconciliation.reconciled,
  }
}

export const transformToApi = (
  reconciliation: Reconciliation,
): ReconciliationRequest => {
  return {
    id: reconciliation.id,
    account_id: reconciliation.accountId,
    statement_balance: reconciliation.statementBalance,
    statement_date: reconciliation.statementDate,
    reconciled: reconciliation.reconciled,
  }
}
