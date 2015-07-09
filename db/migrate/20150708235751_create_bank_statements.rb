class CreateBankStatements < ActiveRecord::Migration
  def change
    create_table :bank_statements do |t|
      t.integer :account_id
      t.date :date
      t.integer :transaction_count
      t.string :file_name

      t.timestamps
    end
  end
end
