class BudgetsController < ApplicationController
  def index
    render json: account.budgets
  end

  def create
    new_budget = Budget.new(budget_params)
    if new_budget.save
      render json: new_budget, status: :created
    else
      render json: new_budget.errors, status: :unprocessable_entity
    end
  end

  def update
    if budget.update(budget_params)
      render json: budget, status: :ok
    else
      render json: budget.errors, status: :unprocessable_entity
    end
  end

  def destroy
    budget.destroy
    head :no_content
  end

  private

  def budget
    @budget ||= Budget.find(params[:id])
  end

  def budget_params
    params.require(:budget).permit(:account_id, :description, :day_of_month, :amount, :credit)
  end
end
