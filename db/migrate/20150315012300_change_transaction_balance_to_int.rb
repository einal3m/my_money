class ChangeTransactionBalanceToInt < ActiveRecord::Migration
  def change
    change_column :transactions, :balance, :integer
  end
end
