export type CategoryRequest = {
  name: string
  category_type_id: number
}

export type CategoryResponse = {
  id: number
  name: string
  category_type_id: number
}

export type SubcategoryRequest = {
  name: string
  category_id: number
}

export type SubcategoryResponse = {
  id: number
  name: string
  category_id: number
}
