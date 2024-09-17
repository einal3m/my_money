export type AccountRequest = {
  account_type: string
  name: string
  bank?: string
  starting_balance?: number
  starting_date?: string
  ticker?: string
  limit?: number
  term?: number
  interest_rate?: number
  deleted_at?: string 
}

export type AccountResponse = AccountRequest & {
  id: number
  current_balance: number,
}

export type CategoryRequest = {
  name: string
  category_type_id: number
}

export type CategoryResponse = CategoryRequest & {
  id: number
}

export type SubcategoryRequest = {
  name: string
  category_id: number
}

export type SubcategoryResponse = SubcategoryRequest & {
  id: number
}

export type PatternRequest = {
  account_id: number,
  match_text: string,
  notes: string,
  category_id: number,
  subcategory_id: number,
}

export type PatternResponse = PatternRequest & {
  id: number
}
