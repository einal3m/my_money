import { useSelector } from 'react-redux'
import {
  useGetCategoriesQuery,
  useGetCategoryTypesQuery,
  useGetSubcategoriesQuery,
} from 'stores/categoryApi'
import { RootState } from 'stores/store'

import { Category, Subcategory, CategoryType } from 'types/models'

export type CategoryWithSubcatories = Category & {
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
  subcategories?: Subcategory[]
  currentCategory?: Category
  currentSubcategory?: Subcategory
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

  const { currentCategory, currentSubcategory } = useSelector(
    (state: RootState) => state.currentStore,
  )

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

  return {
    isLoading,
    isSuccess,
    groupedCategories,
    subcategories,
    currentCategory,
    currentSubcategory,
  }
}
