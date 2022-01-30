class DropTransactionTypeIdFromTransactions < ActiveRecord::Migration[6.0]
  def change
  	remove_column :transactions, :transaction_type_id
  end
end
