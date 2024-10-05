import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const applicationApi = createApi({
  tagTypes: [
    'accounts',
    'account-balance-report',
    'bank-statements',
    'budgets',
    'categories',
    'category-report',
    'dateRanges',
    'income-expense-bar-report',
    'income-expense-report',
    'patterns',
    'loan-report',
    'matching-transactions',
    'net-balance-report',
    'subcategories',
    'subcategory-report',
    'transactions',
  ],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: () => ({}),
})
