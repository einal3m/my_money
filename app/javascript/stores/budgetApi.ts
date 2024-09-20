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
    getBudgets: builder.query<Budget[], number>({
      query(accountId) {
        return {
          url: `accounts/${accountId}/budgets`,
        }
      },
      transformResponse: (results: { budgets: BudgetResponse[] }) =>
        results.budgets.map((budget) => transformFromApi(budget)),
      providesTags: () => ['budgets'],
    }),
    upsertBudget: builder.mutation<void, Budget>({
      query: (budget) => ({
        url: `accounts/${budget.accountId}/budgets${budget.id ? '/' + budget.id : ''}`,
        method: budget.id ? 'PUT' : 'POST',
        body: { budget: transformToApi(budget) },
      }),
      invalidatesTags: ['budgets', 'reports'],
    }),
    deleteBudget: builder.mutation<void, Budget>({
      query: (budget) => ({
        url: `/accounts/${budget.accountId}/budgets/${budget.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['budgets', 'reports'],
    }),
    getLoanReport: builder.query<SeriesData[], number>({
      query(accountId) {
        return {
          url: `report/home_loan?account_id=${accountId}`,
        }
      },
      transformResponse: (loanReport: LoanReportResponse) =>
        transformLoanReport(loanReport),
      providesTags: () => ['reports'],
    }),
  }),
})

export const {
  useGetBudgetsQuery,
  useUpsertBudgetMutation,
  useDeleteBudgetMutation,
  useGetLoanReportQuery,
} = budgetApi
