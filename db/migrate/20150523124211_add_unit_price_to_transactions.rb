class AddUnitPriceToTransactions < ActiveRecord::Migration
  def change
    add_column :transactions, :unit_price, :integer
    add_column :transactions, :quantity, :integer
  end
end
