import { DateRange, Transaction, TransactionFormInput } from 'types/models'
import { TransactionResponse } from 'types/api'
import {
  transformFromApi,
  transformToApi,
} from 'transformers/transactionTransformer'
import { applicationApi } from './applicationApi'

type TransactionParams = {
  accountId: number
  dateRange?: DateRange
  description?: string
}

type MatchingTransactionParams = {
  accountId: number
  transactionId: number
}

export const transactionApi = applicationApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], TransactionParams>({
      query({ accountId, dateRange, description }) {
        return {
          url: `accounts/${accountId}/transactions?from_date=${dateRange?.fromDate}&to_date=${dateRange?.toDate}${description ? `&description=${description}` : ''}`,
        }
      },
      transformResponse: (results: { transactions: TransactionResponse[] }) =>
        results.transactions.map((transaction) =>
          transformFromApi(transaction),
        ),
      providesTags: () => ['transactions'],
    }),
    upsertTransaction: builder.mutation<void, TransactionFormInput>({
      query: (transaction) => ({
        url: `accounts/${transaction.accountId}/transactions${transaction.id ? '/' + transaction.id : ''}`,
        method: transaction.id ? 'PUT' : 'POST',
        body: { transaction: transformToApi(transaction) },
      }),
      invalidatesTags: ['transactions', 'matching-transactions', 'category-report', 'subcategory-report'],
    }),
    deleteTransaction: builder.mutation<void, TransactionFormInput>({
      query: (transaction) => ({
        url: `/accounts/${transaction.accountId}/transactions/${transaction.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['transactions', 'matching-transactions', 'category-report', 'subcategory-report'],
    }),
    getMatchingTransactions: builder.query<
      Transaction[],
      MatchingTransactionParams
    >({
      query({ accountId, transactionId }) {
        return {
          url: `accounts/${accountId}/transactions/${transactionId}/matching`,
        }
      },
      transformResponse: (results: { transactions: TransactionResponse[] }) =>
        results.transactions.map((transaction) =>
          transformFromApi(transaction),
        ),
      providesTags: () => ['matching-transactions'],
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useUpsertTransactionMutation,
  useDeleteTransactionMutation,
  useGetMatchingTransactionsQuery,
} = transactionApi
