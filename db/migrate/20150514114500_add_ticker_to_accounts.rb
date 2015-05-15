class AddTickerToAccounts < ActiveRecord::Migration
  def change
    add_column :accounts, :ticker, :string
  end
end
