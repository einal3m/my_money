import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const applicationApi = createApi({
  tagTypes: [
    'accounts',
    'budgets',
    'categories',
    'category-report',
    'dateRanges',
    'income-expense-report',
    'patterns',
    'loan-report',
    'matching-transactions',
    'subcategories',
    'subcategory-report',
    'transactions',
  ],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),
})
