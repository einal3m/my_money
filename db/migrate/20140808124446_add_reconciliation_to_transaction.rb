class AddReconciliationToTransaction < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :reconciliation_id, :integer
  end
end
