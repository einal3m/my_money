import { BankStatementResponse } from 'types/api'
import { BankStatement } from 'types/models'

export const ofxTransactions = [
  {
    accountId: 1,
    amount: -5500,
    date: '2021-03-09',
    duplicate: true,
    import: false,
    memo: 'VILLAGE CINEMA',
    notes: undefined,
    categoryId: undefined,
    subcategoryId: undefined,
  },
  {
    accountId: 1,
    amount: -7476,
    categoryId: 3,
    date: '2021-03-14',
    duplicate: false,
    import: true,
    memo: 'COLES SUPERMARKETS',
    notes: 'every day shopping',
    subcategoryId: 46,
  },
]

const bankStatements: BankStatementResponse[] = [
  {
    id: 123,
    account_id: 1,
    date: '2001-10-19',
    file_name: 'one.ofx',
    transaction_count: 6,
  },
  {
    id: 456,
    account_id: 1,
    date: '2001-10-20',
    file_name: 'two.ofx',
    transaction_count: 8,
  },
]

export const bankStatementsMock = {
  bank_statements: bankStatements,
}
