import { BankStatement, OfxTransaction } from 'types/models'
import { BankStatementResponse, OfxTransactionResponse } from 'types/api'
import { applicationApi } from './applicationApi'
import { transformFromApi } from 'transformers/bankStatementTransformer'
import {
  transformFromOfxApi,
  transformToApi,
} from 'transformers/bankStatementTransformer'

type UploadOFXParams = {
  accountId: number
  file: File
}

type UploadTransactionParams = {
  accountId: number
  filename: string
  transactions: OfxTransaction[]
}

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
    uploadOFX: builder.mutation<OfxTransaction[], UploadOFXParams>({
      query: ({ accountId, file }) => {
        const formData = new FormData()
        formData.append('data_file', file)

        return {
          url: `accounts/${accountId}/transactions/import`,
          method: 'POST',
          body: formData,
        }
      },
      transformResponse: (results: {
        imported_transactions: OfxTransactionResponse[]
      }) =>
        results.imported_transactions.map((transaction) =>
          transformFromOfxApi(transaction),
        ),
      invalidatesTags: ['bank-statements'],
    }),
    createBankStatement: builder.mutation<void, UploadTransactionParams>({
      query: ({ accountId, filename, transactions }) => ({
        url: `accounts/${accountId}/bank_statements`,
        method: 'POST',
        body: transformToApi(accountId, filename, transactions),
      }),
      invalidatesTags: ['bank-statements', 'transactions'],
    }),
  }),
})

export const {
  useGetBankStatementsQuery,
  useDeleteBankStatementMutation,
  useUploadOFXMutation,
  useCreateBankStatementMutation,
} = importApi
