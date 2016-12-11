class AddMatchingTransactionToTransactions < ActiveRecord::Migration
  def change
    add_column :transactions, :matching_transaction_id, :integer
  end
end
