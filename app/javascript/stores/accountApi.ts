import { Account, AccountFormInput, AccountType } from 'types/models'
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
    upsertAccount: builder.mutation<void, AccountFormInput>({
      query: (account) => ({
        url: `accounts${account.id ? '/' + account.id : ''}`,
        method: account.id ? 'PUT' : 'POST',
        body: { account: transformToApi(account) },
      }),
      invalidatesTags: ['accounts', 'account-balance-report'],
    }),
    deactivateAccount: builder.mutation<void, number>({
      query: (accountId) => ({
        url: `accounts/${accountId}/deactivate`,
        method: 'POST',
      }),
      invalidatesTags: ['accounts', 'account-balance-report'],
    }),
    deleteAccount: builder.mutation<void, number>({
      query: (id) => ({
        url: `/accounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['accounts', 'account-balance-report'],
    }),
  }),
})

export const {
  useGetAccountsQuery,
  useGetAccountTypesQuery,
  useUpsertAccountMutation,
  useDeactivateAccountMutation,
  useDeleteAccountMutation,
} = accountApi
