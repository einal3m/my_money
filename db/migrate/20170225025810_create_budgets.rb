class CreateBudgets < ActiveRecord::Migration
  def change
    create_table :budgets do |t|
      t.integer :account_id
      t.string :description
      t.integer :day_of_month
      t.integer :amount
      t.boolean :credit

      t.timestamps
    end
  end
end
