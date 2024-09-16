import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Pattern } from 'types/models'
import { PatternResponse } from 'types/api'
import {
  transformFromApi,
  transformToApi,
} from 'transformers/patternTransformer'

export const patternApi = createApi({
  reducerPath: 'patternApiStore',
  tagTypes: ['patterns'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPatterns: builder.query<Pattern[], number>({
      query(accountId) {
        return {
          url: `accounts/${accountId}/patterns`,
        }
      },
      transformResponse: (results: { patterns: PatternResponse[] }) =>
        results.patterns.map((pattern) => transformFromApi(pattern)),
      providesTags: () => ['patterns'],
    }),
    upsertPattern: builder.mutation<void, Pattern>({
      query: (pattern) => ({
        url: `accounts/${pattern.accountId}/patterns${pattern.id ? '/' + pattern.id : ''}`,
        method: pattern.id ? 'PUT' : 'POST',
        body: { pattern: transformToApi(pattern) },
      }),
      invalidatesTags: ['patterns'],
    }),
    deletePattern: builder.mutation<void, Pattern>({
      query: (pattern) => ({
        url: `/accounts/${pattern.accountId}/patterns/${pattern.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['patterns'],
    }),
  }),
})

export const {
  useGetPatternsQuery,
  useUpsertPatternMutation,
  useDeletePatternMutation,
} = patternApi
