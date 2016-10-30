class AddLoanAttributesToAccount < ActiveRecord::Migration
  def change
    add_column :accounts, :limit, :integer
    add_column :accounts, :term, :integer
    add_column :accounts, :interest_rate, :decimal
  end
end
