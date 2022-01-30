class AddBankStatementToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :bank_statement_id, :integer
  end
end
