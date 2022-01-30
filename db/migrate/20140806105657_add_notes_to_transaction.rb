class AddNotesToTransaction < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :notes, :string
  end
end
