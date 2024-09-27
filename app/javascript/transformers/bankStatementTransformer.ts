import {
  BankStatementRequest,
  BankStatementResponse,
  OfxTransactionResponse,
} from 'types/api'
import { BankStatement, OfxTransaction } from 'types/models'

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

export const transformFromOfxApi = (
  transaction: OfxTransactionResponse,
): OfxTransaction => {
  return {
    accountId: transaction.account_id,
    date: transaction.date,
    memo: transaction.memo,
    amount: transaction.amount,
    categoryId: transaction.category_id,
    subcategoryId: transaction.subcategory_id,
    notes: transaction.notes,
    import: transaction.import,
    duplicate: transaction.duplicate,
  }
}

export const transformToApi = (
  accountId: number,
  filename: string,
  transactions: OfxTransaction[],
): BankStatementRequest => {
  return {
    account_id: accountId,
    file_name: filename,
    transactions: transactions.map((transaction) => ({
      account_id: transaction.accountId,
      date: transaction.date,
      amount: transaction.amount,
      notes: transaction.notes,
      memo: transaction.memo,
      category_id: transaction.categoryId,
      subcategory_id: transaction.subcategoryId,
    })),
  }
}
