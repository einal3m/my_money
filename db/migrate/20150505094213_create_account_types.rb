class CreateAccountTypes < ActiveRecord::Migration
  def change
    create_table :account_types do |t|
      t.string :name
      t.timestamps
    end

    AccountType.create({ name: 'Savings' })
    AccountType.create({ name: 'Shares' })
  end
end
