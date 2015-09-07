class DropTransactionTypeIdFromTransactions < ActiveRecord::Migration
  def change
  	remove_column :transactions, :transaction_type_id
  end
end
