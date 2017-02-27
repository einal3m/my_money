
export function transformFromApi(apiBudget) {
  return {
    id: apiBudget.id,
    accountId: apiBudget.account_id,
    description: apiBudget.description,
    dayOfMonth: apiBudget.day_of_month,
    amount: apiBudget.amount,
    credit: apiBudget.credit,
  };
}

export function transformToApi(budget) {
  return {
    id: budget.id,
    account_id: budget.accountId,
    description: budget.description,
    day_of_month: budget.dayOfMonth,
    amount: budget.amount,
    credit: budget.credit,
  };
}
