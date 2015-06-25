class RemoveAccountTypeIdFromAccount < ActiveRecord::Migration
  def change
    remove_column :accounts, :account_type_id
  end
end
