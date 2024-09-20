import { Budget } from 'types/models'
import { BudgetResponse } from 'types/api'
import {
  transformFromApi,
  transformToApi,
} from 'transformers/budgetTransformer'
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
      invalidatesTags: ['budgets', 'loan-report'],
    }),
    deleteBudget: builder.mutation<void, Budget>({
      query: (budget) => ({
        url: `/accounts/${budget.accountId}/budgets/${budget.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['budgets', 'loan-report'],
    }),
  }),
})

export const {
  useGetBudgetsQuery,
  useUpsertBudgetMutation,
  useDeleteBudgetMutation,
} = budgetApi
