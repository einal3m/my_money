export enum ModelType {
  Account = 'Account',
  Category = 'Category',
  Pattern = 'Pattern',
  Subcategory = 'Subcategory',
}

export type Account = {
  id?: number,
  accountType: string
  currentBalance: number,
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

export type Pattern = {
  id?: number,
  accountId: number,
  matchText: string,
  notes: string,
  categoryId: number,
  subcategoryId: number,
}

export type Subcategory = {
  id?: number
  name: string
  categoryId: number
}
