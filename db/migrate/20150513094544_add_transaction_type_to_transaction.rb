class AddTransactionTypeToTransaction < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :transaction_type_id, :integer
  end
end
