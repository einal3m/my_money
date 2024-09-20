import { Account, AccountType } from 'types/models'
import { AccountResponse } from 'types/api'
import {
  transformFromApi,
  transformToApi,
} from 'transformers/accountTransformer'
import { applicationApi } from './applicationApi'

export const accountApi = applicationApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountTypes: builder.query<AccountType[], void>({
      query() {
        return {
          url: `/account_types`,
        }
      },
      transformResponse: (results: { account_types: AccountType[] }) =>
        results.account_types,
    }),
    getAccounts: builder.query<Account[], void>({
      query() {
        return {
          url: `/accounts`,
        }
      },
      transformResponse: (results: { accounts: AccountResponse[] }) =>
        results.accounts.map((account) => transformFromApi(account)),
      providesTags: () => ['accounts'],
    }),
    upsertAccount: builder.mutation<void, Account>({
      query: (account) => ({
        url: `accounts${account.id ? '/' + account.id : ''}`,
        method: account.id ? 'PUT' : 'POST',
        body: { account: transformToApi(account) },
      }),
      invalidatesTags: ['accounts'],
    }),
    deleteAccount: builder.mutation<void, number>({
      query: (id) => ({
        url: `/accounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['accounts'],
    }),
  }),
})

export const {
  useGetAccountsQuery,
  useGetAccountTypesQuery,
  useUpsertAccountMutation,
  useDeleteAccountMutation,
} = accountApi
