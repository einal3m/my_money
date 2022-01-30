class AddTransactionTypeToTransactions < ActiveRecord::Migration[6.0]
  def change
    execute <<-SQL
      UPDATE transactions
      SET transaction_type = 'share_purchase'
      WHERE transaction_type_id = 1
    SQL

    execute <<-SQL
      UPDATE transactions
      SET transaction_type = 'dividend'
      WHERE transaction_type_id = 2
    SQL

    execute <<-SQL
      UPDATE transactions
      SET transaction_type = 'unit_price_update'
      WHERE transaction_type_id = 3
    SQL

    execute <<-SQL
      UPDATE transactions
      SET transaction_type = 'share_sale'
      WHERE transaction_type_id = 4
    SQL

    execute <<-SQL
      UPDATE transactions
      SET transaction_type = 'bank_transaction'
      WHERE transaction_type_id IS NULL
    SQL
  end
end
