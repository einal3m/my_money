class DropDateRangeOptions < ActiveRecord::Migration[6.0]
  def change
  	drop_table :date_range_options
  end
end
