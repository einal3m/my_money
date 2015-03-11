class ChangeAccountBalancesToInt < ActiveRecord::Migration
  def change
  	execute <<-SQL
    	UPDATE accounts
    	SET starting_balance = round(starting_balance * 100)
    SQL

    change_column :accounts, :starting_balance, :integer
  end
end
