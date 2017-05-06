class BudgetCommands
  def create(params)
    budget = Budget.create(params)
    budget.id
  end

  def update(budget, params)
    budget.update(params)
  end

  def delete(budget)
    budget.delete
  end
end
