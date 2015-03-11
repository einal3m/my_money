class ChangeReconciliationsBalanceToInt < ActiveRecord::Migration
  def change
  	execute <<-SQL
    	UPDATE reconciliations
    	SET statement_balance = round(statement_balance * 100)
    SQL

    change_column :reconciliations, :statement_balance, :integer
  end
end
