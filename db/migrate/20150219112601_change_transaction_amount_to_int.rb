class ChangeTransactionAmountToInt < ActiveRecord::Migration[6.0]
  def change
  	execute <<-SQL
    	UPDATE transactions
    	SET amount = round(amount * 100),
    	    balance = round(balance * 100)
    SQL

    change_column :transactions, :amount, :integer
  end
end
