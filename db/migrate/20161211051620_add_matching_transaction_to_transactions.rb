class AddMatchingTransactionToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :matching_transaction_id, :integer
  end
end
