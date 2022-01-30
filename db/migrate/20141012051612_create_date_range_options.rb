class CreateDateRangeOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :date_range_options do |t|
      t.string :description
      t.string :klass

      t.timestamps
    end
  end
end
