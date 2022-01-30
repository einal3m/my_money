class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :category_type, :limit => 1

      t.timestamps
    end
  end
end
