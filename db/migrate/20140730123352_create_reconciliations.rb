class CreateReconciliations < ActiveRecord::Migration[6.0]
  def change
    create_table :reconciliations do |t|
      t.integer :account_id
      t.date :statement_date
      t.decimal :statement_balance
      t.boolean :reconciled

      t.timestamps
    end
  end
end
