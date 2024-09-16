import {
  useGetCategoriesQuery,
  useGetCategoryTypesQuery,
  useGetSubcategoriesQuery,
} from 'stores/categoryApi'

import { Category, Subcategory, CategoryType } from 'types/models'

type CategoryWithSubcatories = Category & {
  subcategories: Subcategory[]
}

export type GroupedCategories = {
  categoryType: CategoryType
  categories: CategoryWithSubcatories[]
}

type UseGroupedCategories = {
  isLoading: boolean
  isSuccess: boolean
  groupedCategories?: GroupedCategories[]
}

export const useGroupedCategories = (): UseGroupedCategories => {
  const {
    data: categories,
    isLoading: isLoadingC,
    isSuccess: isSuccessC,
  } = useGetCategoriesQuery()

  const {
    data: categoryTypes,
    isLoading: isLoadingT,
    isSuccess: isSuccessT,
  } = useGetCategoryTypesQuery()

  const {
    data: subcategories,
    isLoading: isLoadingS,
    isSuccess: isSuccessS,
  } = useGetSubcategoriesQuery()

  const isLoading = isLoadingC || isLoadingS || isLoadingT
  const isSuccess = isSuccessC && isSuccessS && isSuccessT

  const groupedCategories = categoryTypes
    ? categoryTypes
        .filter((ct) => ct.editable)
        .map((ct) => ({
          categoryType: ct,
          categories: categories
            ? categories
                .filter((c) => c.categoryTypeId == ct.id)
                .map((c) => ({
                  ...c,
                  subcategories: subcategories
                    ? subcategories?.filter((s) => s.categoryId == c.id)
                    : [],
                }))
            : [],
        }))
    : []

  return { isLoading, isSuccess, groupedCategories }
}
