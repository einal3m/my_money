import { AccountResponse } from 'types/api'
import { AccountType } from 'types/models'

const accountTypes: AccountType[] = [
  { id: 1, code: 'savings', name: 'Savings' },
  { id: 3, code: 'loan', name: 'Loan' },
  { id: 2, code: 'share', name: 'Share' },
]

export const accountTypesMock = {
  account_types: accountTypes,
}

const accounts: AccountResponse[] = [
  {
    id: 1,
    name: 'AccountOne',
    bank: 'BankOne',
    account_type: 'savings',
    current_balance: 678,
  },
  {
    id: 2,
    name: 'AccountTwo',
    account_type: 'loan',
    current_balance: -10000,
    interest_rate: 5,
  },
]

export const accountsMock = {
  accounts,
}
