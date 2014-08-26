class AddBalanceToTransaction < ActiveRecord::Migration
  def change
    add_column :transactions, :balance, :decimal
  end
end
