class RemoveCreditFromBudget < ActiveRecord::Migration[6.0]
  def change
    remove_column :budgets, :credit
  end
end
