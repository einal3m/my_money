import { CategoryResponse, SubcategoryResponse } from 'types/api'

export const categoryTypesMock = {
  category_type2: [
    {
      id: 1,
      code: 'transfer',
      name: 'Transfer',
      editable: false,
    },
    {
      id: 2,
      code: 'income',
      name: 'Income',
      editable: true,
    },
    {
      id: 3,
      code: 'expense',
      name: 'Expense',
      editable: true,
    },
  ],
}

const categories: CategoryResponse[] = [
  { id: 1, name: 'IncomeOne', category_type_id: 2 },
  { id: 2, name: 'IncomeTwo', category_type_id: 2 },
  { id: 3, name: 'ExpenseThree', category_type_id: 3 },
]

export const categoriesMock = {
  categories: categories,
}

const subcategories: SubcategoryResponse[] = [
  { id: 45, name: 'IncomeTwoSub', category_id: 2 },
  { id: 46, name: 'ExpenseThreeSub', category_id: 3 },
]

export const subcategoriesMock = {
  subcategories: subcategories,
}
