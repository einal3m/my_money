import {
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
} from 'stores/categoryApi'
import { useGetIncomeVsExpensesReportQuery } from 'stores/reportApi'
import { transformIncomeExpenseReport } from 'transformers/reportTransformer'

import {
  Category,
  Subcategory,
  CategoryType,
  IncomeExpenseReport,
  DateRange,
} from 'types/models'

type CategoryWithSubcatories = Category & {
  subcategories: Subcategory[]
}

export type GroupedCategories = {
  categoryType: CategoryType
  categories: CategoryWithSubcatories[]
}

type UseIncomeExpenseReport = {
  isLoading: boolean
  isSuccess: boolean
  incomeExpenseReport?: IncomeExpenseReport
}

export const useIncomeExpenseReport = (
  dateRange: DateRange | undefined,
): UseIncomeExpenseReport => {
  const {
    data: categories,
    isLoading: isLoadingC,
    isSuccess: isSuccessC,
  } = useGetCategoriesQuery()

  const {
    data: subcategories,
    isLoading: isLoadingS,
    isSuccess: isSuccessS,
  } = useGetSubcategoriesQuery()

  const {
    data: reportData,
    isLoading: isLoadingR,
    isSuccess: isSuccessR,
  } = useGetIncomeVsExpensesReportQuery(dateRange, { skip: !dateRange })

  const isLoading = isLoadingC || isLoadingS || isLoadingR
  const isSuccess = isSuccessC && isSuccessS && isSuccessR

  let incomeExpenseReport
  if (categories && subcategories && reportData) {
    incomeExpenseReport = transformIncomeExpenseReport(
      reportData,
      categories,
      subcategories,
    )
  }

  return { isLoading, isSuccess, incomeExpenseReport }
}
