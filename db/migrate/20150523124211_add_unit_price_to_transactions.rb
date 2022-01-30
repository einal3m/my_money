class AddUnitPriceToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :unit_price, :integer
    add_column :transactions, :quantity, :integer
  end
end
