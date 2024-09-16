export enum ModelType {
  Category = 'Category',
  Pattern = 'Pattern',
  Subcategory = 'Subcategory',
}

export type Account = {
  id: number,
  name: string
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
