class CreateTransactionTypes < ActiveRecord::Migration
  def change
    create_table :transaction_types do |t|
      t.integer :account_type_id
      t.string :name
      t.timestamps
    end

    TransactionType.create({ account_type_id: 2, name: 'Purchase' })
    TransactionType.create({ account_type_id: 2, name: 'Dividend' })
    TransactionType.create({ account_type_id: 2, name: 'Unit Price Update' })
    TransactionType.create({ account_type_id: 2, name: 'Sale' })
  end
end
