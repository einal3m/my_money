class AddTickerToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :ticker, :string
  end
end
