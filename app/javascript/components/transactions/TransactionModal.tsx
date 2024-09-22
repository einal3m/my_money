import React from 'react'
import { useSelector } from 'react-redux'

import FormModal from '../common/FormModal'
import BankTransactionForm from './BankTransactionForm'
import { useGroupedCategories } from 'hooks/useGroupedCategories'
import { RootState } from 'stores/store'
import { Transaction } from 'types/models'
import { useGetAccountsQuery } from 'stores/accountApi'
import {
  useDeleteTransactionMutation,
  useGetMatchingTransactionsQuery,
  useUpsertTransactionMutation,
} from 'stores/transactionApi'

const TransactionModal = () => {
  const { groupedCategories } = useGroupedCategories()
  const { data: accounts } = useGetAccountsQuery()
  const { show, allowDelete, model, modelType } = useSelector(
    (state: RootState) => state.formStore,
  )
  const { isLoading: matchingLoading, data: matchingTransactions } =
    useGetMatchingTransactionsQuery(
      {
        accountId: model?.accountId || 0,
        transactionId: model?.id || 0,
      },
      { skip: !model?.id },
    )

  const [upsertTransaction] = useUpsertTransactionMutation()
  const [deleteTransaction] = useDeleteTransactionMutation()

  const handleSave = (transaction: Transaction) => {
    upsertTransaction(transaction)
  }

  const handleDelete = () => {
    deleteTransaction(model)
  }

  if (show && accounts && groupedCategories) {
    return (
      <FormModal
        show
        modelName={modelType}
        allowDelete={allowDelete}
        onSave={handleSave}
        onDelete={handleDelete}
      >
        <BankTransactionForm
          accounts={accounts}
          transaction={model}
          groupedCategories={groupedCategories}
          matchLoading={matchingLoading}
          matchingTransactions={model?.id ? matchingTransactions : []}
        />
      </FormModal>
    )
  }
  return <div />
}

export default TransactionModal
