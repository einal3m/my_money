class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.string :transaction_type
      t.date :date
      t.decimal :amount
      t.string :fitid
      t.string :memo
      t.integer :account_id
      t.integer :category_id
      t.integer :subcategory_id

      t.timestamps
    end
  end
end
