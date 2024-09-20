import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const applicationApi = createApi({
  tagTypes: [
    'accounts',
    'budgets',
    'categories',
    'dateRanges',
    'patterns',
    'reports',
    'subcategories',
    'transactions',
  ],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),
})
