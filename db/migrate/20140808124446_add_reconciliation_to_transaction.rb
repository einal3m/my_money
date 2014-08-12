class AddReconciliationToTransaction < ActiveRecord::Migration
  def change
    add_column :transactions, :reconciliation_id, :integer
  end
end
