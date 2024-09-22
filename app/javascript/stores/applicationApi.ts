import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const applicationApi = createApi({
  tagTypes: [
    'accounts',
    'budgets',
    'categories',
    'dateRanges',
    'income-expense-report',
    'patterns',
    'loan-report',
    'matching-transactions',
    'subcategories',
    'transactions',
  ],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),
})
