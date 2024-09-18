import { BankStatementResponse } from 'types/api'
import { BankStatement } from 'types/models'

export const transformFromApi = (
  bankStatement: BankStatementResponse,
): BankStatement => {
  return {
    id: bankStatement.id,
    accountId: bankStatement.account_id,
    fileName: bankStatement.file_name,
    date: bankStatement.date,
    transactionCount: bankStatement.transaction_count,
  }
}
