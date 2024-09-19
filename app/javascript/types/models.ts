export enum ModelType {
  AccountLoan = 'Loan Account',
  AccountSavings = 'Savings Account',
  AccountShare = 'Share Account',
  Budget = 'Budget',
  Category = 'Category',
  Pattern = 'Pattern',
  Subcategory = 'Subcategory',
}

export type Account = {
  id?: number
  accountType: string
  currentBalance: number
  name: string
  bank?: string
  openingBalance?: number
  openingBalanceDate?: string
  ticker?: string
  limit?: number
  term?: number
  interestRate?: number
  deletedAt?: string
}

export type AccountType = {
  id: string
  code: string
  name: string
}

export type BankStatement = {
  id: number
  accountId: number
  fileName: string
  date: string
  transactionCount: number
}

export type Budget = {
  id?: number
  accountId: number
  description: string
  dayOfMonth: number
  amount: number
  credit: boolean
}

export type Category = {
  id?: number
  name: string
  categoryTypeId: number
}

export type CategoryType = {
  id: number
  name: string
  code: string
  editable: boolean
}

export type DateRange = {
  id: number
  name: string
  custom: boolean
  default: boolean
  fromDate: string
  toDate: string
}

export type Pattern = {
  id?: number
  accountId: number
  matchText: string
  notes: string
  categoryId: number
  subcategoryId: number
}

export type Reconciliation = {
  id: number
  accountId: number
  statementBalance: number
  statementDate: string
  reconciled: boolean
}

export type Subcategory = {
  id?: number
  name: string
  categoryId: number
}

export type OfxTransaction = {
  accountId: number
  date: string
  memo: string
  amount: number
  categoryId: number
  subcategoryId: number
  notes: string
  import: boolean
  duplicate: boolean
}

export type MatchingTransaction = {
  id: number
  accountId: number
  memo: string
  notes: string
}

export type Transaction = {
  id: number
  accountId: number
  date: string
  amount: number
  categoryId: number
  subcategoryId: number
  notes: string
  matchingTransactionId?: number
  matchingTransaction?: MatchingTransaction
  memo: string
  balance?: number
  transactionType: string
}

// Reports

export type PointResponse = [string, number]
export type Point = [Date, number]

export type LoanReportResponse = {
  minimum_repayment?: number
  minimum_amortization: PointResponse[]
  budget_amortization: PointResponse[]
}

export type SeriesData = {
  name: string
  data: Point[]
  backgroundColour: string
}
