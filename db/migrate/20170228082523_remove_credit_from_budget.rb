class RemoveCreditFromBudget < ActiveRecord::Migration
  def change
    remove_column :budgets, :credit
  end
end
