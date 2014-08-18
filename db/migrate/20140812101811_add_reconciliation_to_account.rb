class AddReconciliationToAccount < ActiveRecord::Migration
  def change
    add_column :accounts, :reconciliation_id, :integer
  end
end
