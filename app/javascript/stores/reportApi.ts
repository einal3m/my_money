import {
  DateRange,
  LoanReportResponse,
  SeriesData,
} from 'types/models'
import { IncomeExpenseReportResponse } from 'types/api'
import { transformLoanReport } from 'transformers/reportTransformer'
import { applicationApi } from './applicationApi'

export const budgetApi = applicationApi.injectEndpoints({
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
    getIncomeVsExpensesReport: builder.query<IncomeExpenseReportResponse, DateRange | undefined>({
      query(dateRange) {
        return {
          url: `report/income_vs_expense?from_date=${dateRange?.fromDate}&to_date=${dateRange?.toDate}`,
        }
      },
      providesTags: () => ['income-expense-report'],
    }),
  }),
})

export const { useGetLoanReportQuery, useGetIncomeVsExpensesReportQuery } =
  budgetApi
