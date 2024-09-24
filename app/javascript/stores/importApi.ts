import { BankStatement } from 'types/models'
import { BankStatementResponse } from 'types/api'
import { applicationApi } from './applicationApi'
import { transformFromApi } from 'transformers/bankStatementTransformer'

export const importApi = applicationApi.injectEndpoints({
  endpoints: (builder) => ({
    getBankStatements: builder.query<BankStatement[], number>({
      query(accountId) {
        return {
          url: `accounts/${accountId}/bank_statements`,
        }
      },
      transformResponse: (results: {
        bank_statements: BankStatementResponse[]
      }) =>
        results.bank_statements.map((bank_statement) =>
          transformFromApi(bank_statement),
        ),
      providesTags: () => ['bank-statements'],
    }),
    deleteBankStatement: builder.mutation<void, BankStatement>({
      query: (bankStatement) => ({
        url: `accounts/${bankStatement.accountId}/bank_statements/${bankStatement.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bank-statements'],
    }),
  }),
})

export const { useGetBankStatementsQuery, useDeleteBankStatementMutation } =
  importApi
