import { Budget } from 'types/models'
import { BudgetRequest, BudgetResponse } from 'types/api'

export const transformFromApi = (apiBudget: BudgetResponse): Budget => {
  return {
    id: apiBudget.id,
    accountId: apiBudget.account_id,
    description: apiBudget.description,
    dayOfMonth: apiBudget.day_of_month,
    amount: apiBudget.amount,
    credit: apiBudget.credit,
  }
}

export const transformToApi = (budget: Budget): BudgetRequest => {
  return {
    account_id: budget.accountId,
    description: budget.description,
    day_of_month: budget.dayOfMonth,
    amount: budget.amount,
    credit: budget.credit,
  }
}
