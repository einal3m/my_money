class ChangeTransactionBalanceToInt < ActiveRecord::Migration[6.0]
  def change
    change_column :transactions, :balance, :integer
  end
end
