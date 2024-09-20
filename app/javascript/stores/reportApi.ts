import { Budget, LoanReportResponse, SeriesData } from 'types/models'
import { BudgetResponse } from 'types/api'
import {
  transformFromApi,
  transformToApi,
} from 'transformers/budgetTransformer'
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
  }),
})

export const {
  useGetLoanReportQuery,
} = budgetApi
