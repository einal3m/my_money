import React from 'react'
import { useSelector } from 'react-redux'

import FormModal from '../common/FormModal'
import BudgetForm from './BudgetForm'
import { Budget } from 'types/models'
import { RootState } from 'stores/store'
import {
  useDeleteBudgetMutation,
  useUpsertBudgetMutation,
} from 'stores/budgetApi'

const BudgetModal = () => {
  const { show, allowDelete, model, modelType } = useSelector(
    (state: RootState) => state.formStore,
  )
  const [upsertBudget] = useUpsertBudgetMutation()
  const [deleteBudget] = useDeleteBudgetMutation()

  const handleSave = (model: Budget) => {
    upsertBudget(model)
  }

  const handleDelete = () => {
    deleteBudget(model)
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
        <BudgetForm budget={{ ...model }} />
      </FormModal>
    )
  }

  return <div />
}

export default BudgetModal
