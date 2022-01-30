class AddAccountTypeToAccount < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :account_type, :string

    execute <<-SQL
      UPDATE accounts
      SET account_type = 'savings'
      WHERE account_type_id = 1
    SQL

    execute <<-SQL
      UPDATE accounts
      SET account_type = 'share'
      WHERE account_type_id = 2
    SQL
  end
end
