class BudgetsQuery
  def initialize(account)
    @account = account
  end

  def execute
    { budgets: BudgetSerializer.new(@account.budgets).serialize }
  end
end
