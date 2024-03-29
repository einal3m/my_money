class AddAccountTypeIdToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :account_type_id, :integer

    execute <<-SQL
      UPDATE accounts
      SET account_type_id = 1
    SQL
  end
end
