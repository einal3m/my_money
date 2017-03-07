
export function transformFromApi(apiReconciliation) {
  return {
    id: apiReconciliation.id,
    accountId: apiReconciliation.account_id,
    statementBalance: apiReconciliation.statement_balance,
    statementDate: apiReconciliation.statement_date,
    reconciled: apiReconciliation.reconciled,
  };
}

export function transformToApi(reconciliation) {
  return {
    id: reconciliation.id,
    account_id: reconciliation.accountId,
    statement_balance: reconciliation.statementBalance,
    statement_date: reconciliation.statementDate,
    reconciled: reconciliation.reconciled,
  };
}
