export enum Model {
  Category = 'Category',
  Subcategory = 'Subcategory',
}

export type CategoryType = {
  id: number
  name: string
  code: string
  editable: boolean
}

export type Category = {
  id?: number
  name: string
  categoryTypeId: number
}

export type Subcategory = {
  id?: number
  name: string
  categoryId: number
}
