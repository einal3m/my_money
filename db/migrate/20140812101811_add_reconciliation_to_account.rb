class AddReconciliationToAccount < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :reconciliation_id, :integer
  end
end
