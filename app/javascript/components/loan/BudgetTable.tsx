import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BudgetRow from './BudgetRow'
import BudgetModal from './BudgetModal'
import Button from '../common/controls/Button'
import { showFormModal } from 'stores/formSlice'
import { RootState } from 'stores/store'
import { useGetBudgetsQuery } from 'stores/budgetApi'
import { ModelType } from 'types/models'

const BudgetTable = () => {
  const dispatch = useDispatch()
  const currentAccount = useSelector(
    (state: RootState) => state.currentStore.currentAccount,
  )
  const { data: budgets, isLoading } = useGetBudgetsQuery(
    currentAccount?.id || 0,
    { skip: !currentAccount },
  )

  const newBudget = () => {
    dispatch(
      showFormModal({
        modelType: ModelType.Budget,
        model: { accountId: currentAccount?.id },
        allowDelete: false,
      }),
    )
  }

  const renderTitle = () => {
    if (isLoading || !budgets) return <div />

    return (
      <div>
        <div className="pull-left">
          <h3>Budgeted income/expenses</h3>
        </div>
        <div className="pull-left button-group">
          <Button onClick={newBudget}>
            <i className="fas fa-plus" /> New
          </Button>
        </div>
      </div>
    )
  }

  const renderTable = () => {
    if (isLoading || !budgets) return <div />

    return (
      <table className="table table-hover" id="transaction-table">
        <thead>
          <tr>
            <th>description</th>
            <th>day of month</th>
            <th className="currency">amount</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <BudgetRow key={budget.id} budget={budget} />
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      {renderTitle()}
      {renderTable()}
      <BudgetModal />
    </div>
  )
}

export default BudgetTable
