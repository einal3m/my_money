class AddLastReconciledInfoToReconciliation < ActiveRecord::Migration
  def change
    add_column :reconciliations, :last_reconciled_date, :date
    add_column :reconciliations, :last_reconciled_balance, :decimal
  end
end
