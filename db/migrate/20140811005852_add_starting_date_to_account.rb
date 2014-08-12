class AddStartingDateToAccount < ActiveRecord::Migration
  def change
    add_column :accounts, :starting_date, :date
  end
end
