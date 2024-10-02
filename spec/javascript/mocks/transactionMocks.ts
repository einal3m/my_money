import { TransactionResponse } from 'types/api'
import { todaysDate } from './dateHelpers'

const transactions1: TransactionResponse[] = [
  {
    id: 1,
    account_id: 1,
    date: todaysDate,
    amount: 1000,
    memo: 'Memo1',
    transaction_type: 'bank_transaction',
    balance: 1000,
  },
  {
    id: 2,
    account_id: 1,
    date: todaysDate,
    amount: 3000,
    notes: 'Note2',
    category_id: 2,
    subcategory_id: 45,
    transaction_type: 'bank_transaction',
    balance: 4000,
  },
]

export const transactionsAccount1 = {
  transactions: transactions1,
}
