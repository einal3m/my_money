import React from 'react'
import { useSelector } from 'react-redux'

import FormModal from '../common/FormModal'
import SavingsAccountForm from './SavingsAccountForm'
import ShareAccountForm from './ShareAccountForm'
import HomeLoanAccountForm from './HomeLoanAccountForm'
import { RootState } from 'stores/store'
import { Account, ModelType } from 'types/models'
import { useDeleteAccountMutation, useUpsertAccountMutation } from 'stores/accountApi'

export const AccountModal = () => {
  const { show, allowDelete, model, modelType } = useSelector(
    (state: RootState) => state.formStore,
  )
  const [upsertAccount] = useUpsertAccountMutation()
  const [deleteAccount] = useDeleteAccountMutation()

  const handleSave = (model: Account) => {
    upsertAccount(model)
  }

  const handleDelete = (modelId: number) => {
    deleteAccount(modelId)
  }

  const renderForm = () => {
    switch (modelType) {
      case ModelType.AccountShare:
        return <ShareAccountForm account={model} />
      case ModelType.AccountLoan:
        return <HomeLoanAccountForm account={model} />
      default:
        return <SavingsAccountForm account={model} />
    }
  }

  if (show) {
    return (
      <FormModal
        show
        modelName={modelType}
        allowDelete={allowDelete}
        onSave={handleSave}
        onDelete={handleDelete}
      >
        {renderForm()}
      </FormModal>
    )
  }
  return <div />
}

export default AccountModal
