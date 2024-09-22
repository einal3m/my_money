import {
  DateRange,
  LoanReportResponse,
  SeriesData,
  TransactionReport,
} from 'types/models'
import { TransactionReportResponse, IncomeExpenseReportResponse } from 'types/api'
import { transformLoanReport, transformMonthTotals } from 'transformers/reportTransformer'
import { applicationApi } from './applicationApi'
import { transformFromApi } from 'transformers/transactionTransformer'

type CategoryReportParams = {
  categoryId?: number
  dateRange?: DateRange
}

type SubcategoryReportParams = {
  categoryId?: number
  subcategoryId?: number
  dateRange?: DateRange
}

export const reportApi = applicationApi.injectEndpoints({
  endpoints: (builder) => ({
    getLoanReport: builder.query<SeriesData[], number>({
      query(accountId) {
        return {
          url: `report/home_loan?account_id=${accountId}`,
        }
      },
      transformResponse: (loanReport: LoanReportResponse) =>
        transformLoanReport(loanReport),
      providesTags: () => ['loan-report'],
    }),
    getIncomeVsExpensesReport: builder.query<
      IncomeExpenseReportResponse,
      DateRange | undefined
    >({
      query(dateRange) {
        return {
          url: `report/income_vs_expense?from_date=${dateRange?.fromDate}&to_date=${dateRange?.toDate}`,
        }
      },
      providesTags: () => ['income-expense-report'],
    }),
    getCategoryReport: builder.query<TransactionReport, CategoryReportParams>({
      query({ categoryId, dateRange }) {
        return {
          url: `report/category?category_id=${categoryId || ''}&from_date=${dateRange?.fromDate}&to_date=${dateRange?.toDate}`,
        }
      },
      transformResponse: (report: TransactionReportResponse) => ({
        transactions: report.transactions.map((transaction) =>
          transformFromApi(transaction),
        ),
        chartData: transformMonthTotals(report.month_totals)
      }),
      providesTags: () => ['category-report'],
    }),
    getSubcategoryReport: builder.query<TransactionReport, SubcategoryReportParams>({
      query({ categoryId, subcategoryId, dateRange }) {
        return {
          url: `report/subcategory?category_id=${categoryId || ''}&subcategory_id=${subcategoryId || ''}&from_date=${dateRange?.fromDate}&to_date=${dateRange?.toDate}`,
        }
      },
      transformResponse: (report: TransactionReportResponse) => ({
        transactions: report.transactions.map((transaction) =>
          transformFromApi(transaction),
        ),
        chartData: transformMonthTotals(report.month_totals)
      }),
      providesTags: () => ['subcategory-report'],
    }),
  }),
})

export const {
  useGetLoanReportQuery,
  useGetIncomeVsExpensesReportQuery,
  useGetCategoryReportQuery,
  useGetSubcategoryReportQuery
} = reportApi
