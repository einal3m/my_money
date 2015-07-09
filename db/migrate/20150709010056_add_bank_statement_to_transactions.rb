class AddBankStatementToTransactions < ActiveRecord::Migration
  def change
    add_column :transactions, :bank_statement_id, :integer
  end
end
