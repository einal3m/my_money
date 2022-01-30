class DropAccountTypeIdFromAccounts < ActiveRecord::Migration[6.0]
  def change
  	remove_column :accounts, :account_type_id
  end
end
