class AddAttributesToDateRangeOption < ActiveRecord::Migration[6.0]
  def change
    add_column :date_range_options, :order, :int
    add_column :date_range_options, :default, :boolean
  end
end
