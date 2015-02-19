class ChangeTransactionAmountToInt < ActiveRecord::Migration
  def change
  	execute <<-SQL
    	UPDATE transactions
    	SET amount = amount * 100
    SQL

    change_column :transactions, :amount, :integer
  end
end
