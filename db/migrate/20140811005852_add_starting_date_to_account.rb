class AddStartingDateToAccount < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :starting_date, :date
  end
end
